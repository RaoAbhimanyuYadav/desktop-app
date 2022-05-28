import { useEffect, useState } from "react";
const useFetch = (url) => {
  const [data, setdata] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Link is not valid");
          }
          return res.json();
        })
        .then((data) => {
          setdata(data);
          setIsPending(false);
          setError(null);
        })
        .catch((err) => {
          if (err.name === "AbortError") {
            console.log("abort");
          } else {
            setError(err.message);
            setIsPending(false);
          }
        });
    }, 1000);
    return () => abortCont.abort();
  }, [url]);
  return { data, isPending, error };
};

export default useFetch;
