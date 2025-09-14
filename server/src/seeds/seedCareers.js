/* eslint-disable no-console */
import fs from "fs";
import csv from "csv-parser";
import mongoose from "mongoose";
import Career from "../models/Career.js"; // adjust path if necessary
import dotenv from "dotenv";
dotenv.config();

const DATA_DIR = "./src/seeds/data"; // folder with the 4 txt files

(async () => {
  try {
    // 0. Connect to Mongo
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongo connected");

    // 1. Build base docs from Occupation Data
    const docs = {}; // key = O*NET-SOC Code
    await new Promise((res) => {
      fs.createReadStream(`${DATA_DIR}/Occupation Data.txt`)
        .pipe(csv({ separator: "\t" }))
        .on("data", (row) => {
          docs[row["O*NET-SOC Code"]] = {
            title: row.Title,
            description: row.Description,
            hollandCodes: [],
            coreSkills: [],
          };
        })
        .on("end", res);
    });

    // 2. Add Holland codes with scores from all interest high-points
    const interestMap = {}; // code -> array of {element, value}
    await new Promise((res) => {
      fs.createReadStream(`${DATA_DIR}/Interests.txt`)
        .pipe(csv({ separator: "\t" }))
        .on("data", (row) => {
          const code = row["O*NET-SOC Code"];
          if (!docs[code]) return;
          if (!row["Element Name"].includes("Interest High-Point")) return;
          if (!interestMap[code]) interestMap[code] = [];
          interestMap[code].push({
            element: row["Element Name"],
            value: parseInt(row["Data Value"]),
          });
        })
        .on("end", res);
    });
    // Process interestMap to assign codes and scores
    Object.keys(interestMap).forEach((code) => {
      const interests = interestMap[code];
      // Sort by rank (First, Second, etc.)
      const rankMap = {
        First: 1,
        Second: 2,
        Third: 3,
        Fourth: 4,
        Fifth: 5,
        Sixth: 6,
      };
      interests.sort((a, b) => {
        const aRank = rankMap[a.element.split(" ")[0]] || 999;
        const bRank = rankMap[b.element.split(" ")[0]] || 999;
        return aRank - bRank;
      });
      // Map to hollandCodes
      const themeMap = {
        1: "Realistic",
        2: "Investigative",
        3: "Artistic",
        4: "Social",
        5: "Enterprising",
        6: "Conventional",
      };
      docs[code].hollandCodes = interests
        .map((interest, index) => {
          const codeName = themeMap[interest.value];
          if (!codeName) return null; // Skip invalid values
          const score = Math.max(100 - index * 20, 10); // 100, 80, 60, 40, 20, 10
          return { code: codeName, score };
        })
        .filter((item) => item !== null);
    });

    // 3. Add top 6 skills (highest Data Value)
    const skillMap = {}; // code -> array of {name, score}
    await new Promise((res) => {
      fs.createReadStream(`${DATA_DIR}/Skills.txt`)
        .pipe(csv({ separator: "\t" }))
        .on("data", (row) => {
          const code = row["O*NET-SOC Code"];
          if (!docs[code]) return;
          if (row["Scale ID"] !== "IM") return; // Only use Importance scores
          const score = parseFloat(row["Data Value"]);
          if (Number.isNaN(score)) return;
          if (!skillMap[code]) skillMap[code] = [];
          skillMap[code].push({ name: row["Element Name"], score });
        })
        .on("end", res);
    });
    // sort & keep best 6
    Object.keys(skillMap).forEach((code) => {
      skillMap[code].sort((a, b) => b.score - a.score);
      docs[code].coreSkills = skillMap[code].slice(0, 6).map((s) => s.name);
    });

    // 4. Convert to array and insert
    const toInsert = Object.values(docs).filter(
      (d) => d.hollandCodes && d.hollandCodes.length > 0
    ); // drop if no holland codes
    await Career.deleteMany({});
    await Career.insertMany(toInsert);
    console.log(`✅ ${toInsert.length} careers inserted`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
