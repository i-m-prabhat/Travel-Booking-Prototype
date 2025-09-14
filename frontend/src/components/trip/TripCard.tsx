import moment from "moment";
import { FaStar, FaClock, FaUsers, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TripCard = ({ trip }: any) =>
{
    const navigate = useNavigate();
    return (
        <div className="tripx-card">
            <div
                className="tripx-image"
                style={{ backgroundImage: `url(/travel.png)` }}
            >
                <span className="tripx-tag">Popular</span>
                <span className="tripx-discount">12%</span>
            </div>
            <div className="tripx-details">
                <div className="tripx-rating">
                    {Array.from({ length: 5 }, (_, i) => (
                        <FaStar className="tripx-icon star" />
                    ))}
                    ({trip.reviews || 0} reviews)
                </div>
                <h3>{trip.from + " to " + trip.to}</h3>
                <p><FaClock className="tripx-icon" /> {moment.utc(moment.duration(moment(trip.arrivalTime, 'HH:mm').diff(moment(trip.departureTime, 'HH:mm'))).asMilliseconds()).format('H[h] mm[min]')}</p>
                <p><FaUsers className="tripx-icon" /> {trip.availableSeats} seats available</p>
                <p><FaCalendarAlt className="tripx-icon" /> {moment(trip.date).calendar()}</p>
                <div className="d-flex justify-content-between">

                    <div className="tripx-price-row">
                        <span className="tripx-price">${trip.price}</span>
                        {/* {trip.originalPrice && ( */}
                        <span className="tripx-original-price">${(trip.price * 1.12).toFixed(2)}</span>
                        {/* )} */}
                    </div>
                    <button className="tripx-book-btn" onClick={() => navigate(`/bookings/${trip._id}`)}>Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default TripCard;
