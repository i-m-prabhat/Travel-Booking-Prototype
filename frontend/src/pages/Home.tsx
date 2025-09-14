import SearchSection from "../components/SearchSection";
import TripsSection from "../components/TripsSection";


const trips = [
    {
        id: 1,
        title: "New York → Boston",
        reviews: 124,
        duration: "4h 30min",
        seats: 12,
        date: "Dec 15, 2024",
        price: 48,
        originalPrice: 64,
        tag: "Popular",
        discount: "25% OFF",
        image: "/images/nyc.jpg"
    },
    {
        id: 2,
        title: "Chicago → Los Angeles",
        reviews: 89,
        duration: "5h 45min",
        seats: 8,
        date: "Dec 18, 2024",
        price: 156,
        originalPrice: 198,
        discount: "21% OFF",
        image: "/images/la.jpg"
    },
    {
        id: 3,
        title: "Atlanta → Miami",
        reviews: 156,
        duration: "2h 51min",
        seats: 15,
        date: "Dec 20, 2024",
        price: 129,
        image: "/images/miami.jpg"
    },
    // duplicate or reverse trips for display
];

const Home = () =>
{
    return (
        <main className="home">

            <SearchSection />


            <TripsSection trips={trips} />
        </main>
    );
};

export default Home;
