import { FaStar, FaClock, FaUsers, FaCalendarAlt } from "react-icons/fa";

const TripCard = ({ trip }: any) =>
{
    return (
        <div className="tripx-card">
            <div
                className="tripx-image"
                style={{ backgroundImage: `url(/travel.png)` }}
            >
                {trip.tag && <span className="tripx-tag">{trip.tag}</span>}
                {trip.discount && <span className="tripx-discount">{trip.discount}</span>}
            </div>
            <div className="tripx-details">
                <div className="tripx-rating">
                    {Array.from({ length: 5 }, (_, i) => (
                        <FaStar className="tripx-icon star" />
                    ))}
                    ({trip.reviews} reviews)
                </div>
                <h3>{trip.title}</h3>
                <p><FaClock className="tripx-icon" /> {trip.duration}</p>
                <p><FaUsers className="tripx-icon" /> {trip.seats} seats available</p>
                <p><FaCalendarAlt className="tripx-icon" /> {trip.date}</p>
                <div className="d-flex justify-content-between">

                    <div className="tripx-price-row">
                        <span className="tripx-price">${trip.price}</span>
                        {trip.originalPrice && (
                            <span className="tripx-original-price">${trip.originalPrice}</span>
                        )}
                    </div>
                    <button className="tripx-book-btn">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default TripCard;
