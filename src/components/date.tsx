import { parseISO, format } from "date-fns";

interface DateProps {
    dateString: string;
}

export default function Date({ dateString }: DateProps) {
    let formattedDate = "Invalid date";    

    if (dateString) {
        try {
            const date = parseISO(dateString);
            formattedDate = format(date, "LLLL d, yyyy");
        } catch (e) {
            console.error("Date parsing failed:", dateString, e);
        }
    }

    return <time dateTime={dateString}>{formattedDate}</time>;
}
