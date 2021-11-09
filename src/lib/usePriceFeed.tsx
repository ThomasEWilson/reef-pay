import axios, { AxiosResponse } from 'axios';
import { useEffect, useRef, useState } from 'react';

const REEF_TOKEN_ID = 'reef-finance';

interface PriceRes {
  [currenty: string]: {
    usd: number;
  }
}

const coingeckoApi = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3/',
});

export const getTokenPrice = async (tokenId: string): Promise<number> => coingeckoApi
  .get<void, AxiosResponse<PriceRes>>(`/simple/price?ids=${tokenId}&vs_currencies=usd`)
  .then((res) => res.data[tokenId].usd);

export const getCoingeckoPrice = async (): Promise<number> => getTokenPrice(REEF_TOKEN_ID);

export default function usePriceFeed(): number | null {

    const [reefValuation, setReefValuation] = useState<number | null>(null);
    const intervalRef = useRef<any>();

    useEffect(() => {
        const updateReefCurrentPrice = async () => {
            const price = await getCoingeckoPrice();
            setReefValuation(price);
        }
    
        if (intervalRef.current === null) {
            updateReefCurrentPrice();
            intervalRef.current = setInterval(() => {
                updateReefCurrentPrice();
            }, 3000);
        }
    
        return () => {
            intervalRef.current = null;
        }
    }, []) 

    return reefValuation || null;
}