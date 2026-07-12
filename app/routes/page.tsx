import Link from "next/link";
import { SignUpButton } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import CardSummary from "./components/CardSummary/CardSummary";
import { UsersRound } from "lucide-react";


export default function Home() {
  return (
      <div>
        <h2 className="text-2xl bn-4">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20">
          <CardSummary 
            total="12.450"
            avarage={15}
            title="Companies created"
            tooltipText="see all of a companies created"
          />
          <div>Card Summary</div>
          <div>Card Summary</div>
        </div>

      </div>
  );
}