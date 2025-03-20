import axios from "axios";
import { useEffect, useState } from "react";

export default function useAxiosFetch(dataUrl) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        let isMounted = true;

        const controller = new AbortController();

        const fetchData = async (dataUrl) => {
            setIsLoading(true);
            try {
                const response = await axios.get(dataUrl, {
                    signal: controller.signal,
                });
                if (isMounted) {
                    setData(response.data);
                    setFetchError(null);
                }
            } catch (error) {
                if (isMounted) {
                    setData([]);
                    setFetchError(error.message);
                }
            } finally {
                setIsLoading(false);
                // isMounted && setTimeout(() => setIsLoading(false), 2000); // just for testing purposes
            }
        };

        fetchData(dataUrl);

        const cleanUp = () => {
            console.log("clean up function");
            isMounted = false;
            controller.abort();
        };

        return cleanUp;
    }, [dataUrl]);

    return [data, isLoading, fetchError];
}
