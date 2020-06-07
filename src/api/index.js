import axios from 'axios';

const url = "https://raw.githubusercontent.com/henrikig/property_prices/master/price_history.json"

export const fetchPropertyData = async () => {
    try {
        const data = await axios.get(url);

        return data;
    } catch (err) {
        console.log(err);
        return err;
    }
}