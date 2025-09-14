import { FaClock, FaUserFriends, FaCalendarAlt } from "react-icons/fa";
import TripCard from "./trip/TripCard";

const TripsSection = ({ trips }: any) =>
{
    return (
        <section className="tripx-section">
            <h2>Available Trips</h2>
            <p>Choose from our carefully selected destinations and enjoy a comfortable journey.</p>

            <div className="tripx-grid">
                {trips.map((trip: any) => (
                    <TripCard key={trip.id} trip={trip} />
                ))}
            </div>
        </section>
    );
};

export default TripsSection;
