import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { calculateEcoScore } from "@/lib/eco-score";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default async function PlacePage() {
  return <div>Place Details Page</div>;
}
