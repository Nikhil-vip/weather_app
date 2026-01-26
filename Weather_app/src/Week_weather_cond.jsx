
const Weekly_cond = () => {
  // 1. Get the data and parse it. 
  // SessionStorage stores strings, so we convert it back to an array/number.
  const storedData = sessionStorage.getItem("weathercode");

  if (!storedData) return "No data";

  // Parse the string into a usable format (assuming it's a JSON array or a number)
  const codeData = JSON.parse(storedData);

  // If the data is an array (weekly forecast), we usually want the first day [0]
  // If it's just a single number, use it directly.
  const codee = Array.isArray(codeData) ? codeData[0] : parseInt(codeData);

  // 2. Use a Switch Statement or a Mapping Object for better readability
  const getWeatherDescription = (wmoCode) => {
    if (wmoCode === 0) return "Clear sky";
    if (wmoCode >= 1 && wmoCode <= 3) return "Partly cloudy";
    if (wmoCode >= 45 && wmoCode <= 48) return "Foggy";
    if (wmoCode >= 51 && wmoCode <= 55) return "Drizzle";
    if (wmoCode >= 61 && wmoCode <= 65) return "Rainy";
    if (wmoCode >= 71 && wmoCode <= 77) return "Snowy";
    if (wmoCode >= 80 && wmoCode <= 82) return "Rain showers";
    if (wmoCode >= 95) return "Thunderstorm";
    return `Unknown Code: ${wmoCode}`;
  };

  return (
    <span>
      {getWeatherDescription(codee)}
    </span>
  );
};

export default Weekly_cond;