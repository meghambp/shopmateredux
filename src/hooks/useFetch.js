import { useEffect, useRef, useState } from 'react'

export const useFetch = (url, _body) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const body = useRef(_body);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await fetch(url, { signal: controller.signal });
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const result = await response.json();
                setLoading(false);
                setData(result);
                console.log(body);
            }
            catch (error) {
                console.log(error.message);
                setLoading(false);
                setError(error.message);
            }
            return () => controller.abort();
        }
        fetchData();
    }, [url, body]);
    return { data, loading, error };
}
