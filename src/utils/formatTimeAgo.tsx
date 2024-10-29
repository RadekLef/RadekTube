import { DIVISIONS } from "../data/home";

const formatter = new Intl.RelativeTimeFormat(undefined, {
    numeric: "always",
  })
    
  export default function formatTimeAgo(date: Date) {
    let duration = (date.getTime() - new Date().getTime()) / 1000
  
    for (let i = 0; i < DIVISIONS.length; i++) {
      const division = DIVISIONS[i]
      if (Math.abs(duration) < division.amount) {
        return formatter.format(Math.round(duration), division.name)
      }
      duration /= division.amount
    }
  }