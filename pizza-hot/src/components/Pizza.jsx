import { useContext, useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { CartContext } from "../contexts/CartContext";

export default function Pizza({ pizza }) {
  const { color, mode } = useContext(ThemeContext);

  const { addItem } = useContext(CartContext);
  const [isHovered, setIsHovered] = useState(false);

  // style={{ boxShadow: `0 0 30px rgba(var(--bs-${color}-rgb), 0.5)` }}

  function handleAddItem() {
    addItem(pizza);
  }
  return (
    <div className="col">
      <div
        className={`card item-${mode} border-${color} border-opacity-50`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transition: "box-shadow 0.3s ease",
          boxShadow: isHovered
            ? `0 0 30px rgba(var(--bs-${color}-rgb), 0.5)`
            : "none",
        }}
      >
        <img
          src={`http://localhost:3000/images/${pizza.image}`}
          alt={pizza.title}
          className="card-img-top p-2 p-md-3 border-bottom"
        />
        <div className="card-body">
          <h3 className="card-title">{pizza.title}</h3>
          <p className="card-text">{pizza.description}</p>
          <div className="item-price">
            <b>{pizza.price}₺</b>
            <button
              className={`btn btn-sm btn-outline-${color}`}
              onClick={handleAddItem}
            >
              Sepete Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
