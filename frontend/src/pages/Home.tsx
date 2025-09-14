import { useEffect, useState } from "react";
import SearchSection from "../components/SearchSection";
import TripsSection from "../components/TripsSection";
import { getAllTrips } from "../api/trips";

const Home = () =>
{
    const [trips, setTrips] = useState<any>();
    const [filters, setFilters] = useState<{ from?: string; to?: string; date?: string }>({});

    const fetchTrips = async (params: any = {}) =>
    {
        try
        {
            const { data } = await getAllTrips(params);
            setTrips(data?.trips || []);
        } catch (err)
        {
            console.error("Error fetching trips:", err);
        }
    };

    useEffect(() =>
    {
        fetchTrips(filters);
    }, [filters]);

    const handleSearch = (searchFilters: { from: string; to: string; date: string }) =>
    {
        setFilters(searchFilters);
    };

    return (
        <main className="home">
            <SearchSection onSearch={handleSearch} />
            <TripsSection trips={trips || []} />
        </main>
    );
};

export default Home;
