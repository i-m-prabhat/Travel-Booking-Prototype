import { FaClock, FaUserFriends, FaCalendarAlt } from "react-icons/fa";
import TripCard from "./trip/TripCard";

const TripsSection = ({ trips }: any) =>
{
    return (
        <section className="tripx-section">
            <h2>Available Trips</h2>
            <p>Choose from our carefully selected destinations and enjoy a comfortable journey.</p>

            <div className="tripx-grid">

                {trips.length > 0 ? trips.map((trip: any, idx: number) => (
                    <TripCard key={idx} trip={trip} />
                )) : <p>No trips available</p>}
            </div>
        </section>
    );
};

export default TripsSection;
