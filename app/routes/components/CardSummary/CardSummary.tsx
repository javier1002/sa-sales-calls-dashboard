import React from "react"
import { CardSummaryProps } from "./CardSummary.types"

export default function CardSummary(props: CardSummaryProps) {
    const {avarage, title, total, tooltipText} = props
    return(
        <div className="shadow-sm bg-background rounded-lg p-5 py-3 hover:shadow-lg transition">

            <div className="flex justify-between">
                {title}


            </div>
        </div>

        
    
    )    
}