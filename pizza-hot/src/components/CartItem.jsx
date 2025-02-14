export default function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <li className="cart-item broder-bottom p-2">
      <div className="item-info">
        <img
          src={`http://localhost:3000/images/${item.image}`}
          alt={item.title}
        />
        <p>
          {item.title} - {item.quantity * item.price}₺
        </p>
      </div>
      <div className="actions">
        <button className="btn btn-sm btn-outline-primary" onClick={onDecrease}>
          -
        </button>
        <span>{item.quantity}</span>
        <button className="btn btn-sm btn-outline-primary" onClick={onIncrease}>
          +
        </button>
      </div>
    </li>
  );
}
