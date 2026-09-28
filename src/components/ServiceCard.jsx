function ServiceCard({ title, description, icon, onClick }) {
  return (
    <div className="service-card">
      <div className="service-icon">{icon}</div>

      <h3>{title}</h3>

      <p>{description}</p>

      <button onClick={onClick}>
        Explore
      </button>
    </div>
  );
}

export default ServiceCard;