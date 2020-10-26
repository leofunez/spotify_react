export const dateFormatter = (date) => {
    const date_array = date.split("-")
    const date_year  = date_array[0]
    const date_month = date_array[1]
    const date_day   = date_array[2] 
    
    const months = ["Jan", "Feb", "Apr", "May", "Jun", "Jul", "Aug", "Oct", "Sep", "Oct", "Nov", "Dec"]
    const str_month = months[parseInt(date_month) - 1]
    return `${str_month} ${date_day}, ${date_year}`
}