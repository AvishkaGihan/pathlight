import csv from "csv-parser";
import fs from "fs";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../../server/.env") });

async function seedSyntheticProfiles() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;

    console.log("Connected to MongoDB");

    // Clear existing synthetic data
    await db.collection("synthetic").deleteMany({});
    console.log("Cleared existing synthetic profiles");

    const rows = [];
    const csvPath = path.join(__dirname, "../../data/syntheticProfiles.csv");

    // Read CSV and parse data
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => {
        // Convert string values to numbers where needed
        rows.push({
          profileId: parseInt(row.profileId),
          openness: parseFloat(row.openness),
          conscientiousness: parseFloat(row.conscientiousness),
          extraversion: parseFloat(row.extraversion),
          agreeableness: parseFloat(row.agreeableness),
          neuroticism: parseFloat(row.neuroticism),
          idealCareer: row.idealCareer,
        });
      })
      .on("end", async () => {
        try {
          await db.collection("synthetic").insertMany(rows);
          console.log(
            `Successfully inserted ${rows.length} synthetic profiles`
          );
        } catch (error) {
          console.error("Error inserting profiles:", error);
        } finally {
          await mongoose.disconnect();
          process.exit(0);
        }
      })
      .on("error", (error) => {
        console.error("Error reading CSV file:", error);
        process.exit(1);
      });
  } catch (error) {
    console.error("Error seeding synthetic profiles:", error);
    process.exit(1);
  }
}

seedSyntheticProfiles();
