import { useState, useEffect } from "react";
import outOfstockImage from "../asset/outofstock.png";
import { Link } from "react-router-dom";

const ProductCard = ({ product, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [countdown, setCountdown] = useState(24 * 60 * 60);

  useEffect(() => {
    if (product.price < 50 && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [product.price, countdown]);

  const formatCountdown = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const variants =
    product.category === "men's clothing" ||
    product.category === "women's clothing"
      ? ["S", "M", "L", "XL"]
      : [];

  const isOutOfStock = product.rating.count < 150;

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (!isOutOfStock && onAddToCart) {
      onAddToCart(product);
    }
  };

  const cardHoverStyle = {
    transition: "all 0.3s ease",
    borderRadius: "16px",
  };

  const imageStyle = {
    height: "250px",
    objectFit: "contain",
    transition: "transform 0.3s ease",
    filter: isOutOfStock
      ? "grayscale(100%) brightness(0.7) blur(2px) contrast(0.8)"
      : "none",
  };

  const handleCardMouseEnter = (e) => {
    e.currentTarget.style.transform = "translateY(-4px)";
    e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
  };

  const handleCardMouseLeave = (e) => {
    e.currentTarget.style.transform = "translateY(0)";
    e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
  };

  const handleImageMouseEnter = (e) => {
    if (!isOutOfStock) e.currentTarget.style.transform = "scale(1.05)";
  };

  const handleImageMouseLeave = (e) => {
    e.currentTarget.style.transform = "scale(1)";
  };

  return (
    <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
      <div
        className="card h-100 border-0 shadow-sm position-relative overflow-hidden"
        style={cardHoverStyle}
        onMouseEnter={handleCardMouseEnter}
        onMouseLeave={handleCardMouseLeave}
      >
        <div className="position-relative bg-light">
          <Link to={`/product/${product.id}`}>
            <img
              className="card-img-top p-3 w-100"
              src={product.image}
              alt={product.title}
              style={imageStyle}
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
            />
          </Link>

          {product.price < 50 ? (
            <div className="position-absolute bottom-0 start-0 w-100 px-2 bg-gradient text-white d-flex align-items-center justify-content-center fw-semibold small">
              <div
                className="w-100 text-center py-1"
                style={{
                  background: "linear-gradient(135deg, #e91e63, #f06292)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                Flash Sale! Special price available for&nbsp;
                <span className="font-monospace">
                  {formatCountdown(countdown)}
                </span>
              </div>
            </div>
          ) : (
            product.price > 50 &&
            product.rating.count < 300 &&
            product.rating.count >= 150 && (
              <div className="position-absolute bottom-0 start-0 w-100 px-2 d-flex align-items-center justify-content-center fw-semibold small text-dark">
                <div
                  className="w-100 text-center py-1"
                  style={{
                    background: "rgba(255, 193, 7, 0.95)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                  }}
                >
                  Limited Quantity! Don't miss out.
                </div>
              </div>
            )
          )}

          {isOutOfStock && (
            <img
              src={outOfstockImage}
              alt="Out of Stock"
              className="position-absolute top-50 start-50 translate-middle"
              style={{
                width: "150px",
                opacity: 0.8,
                pointerEvents: "none",
              }}
            />
          )}

          <button
            onClick={handleFavoriteToggle}
            className="btn btn-light position-absolute rounded-circle border-0 shadow-sm d-flex align-items-center justify-content-center"
            style={{
              top: "10px",
              right: "10px",
              width: "40px",
              height: "40px",
            }}
          >
            <span
              className="fs-5"
              style={{
                color: isFavorite ? "#e91e63" : "#666",
              }}
            >
              {isFavorite ? "♥" : "♡"}
            </span>
          </button>

          {product.price < 50 && (
            <div
              className="position-absolute top-0 start-0 m-2 px-2 py-1 rounded-pill text-white small fw-semibold"
              style={{
                background: "linear-gradient(135deg, #e91e63, #f06292)",
              }}
            >
              32% OFF
            </div>
          )}
        </div>

        <div className="card-body p-3">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span className="small text-muted text-capitalize fw-medium">
              {product.category.replace("'s", "")}
            </span>
            <div className="d-flex align-items-center mb-3">
              <span className="text-success small fw-medium">
                ★ {product.rating.rate}
              </span>
              <span className="text-muted small ms-2">
                ({product.rating.count.toLocaleString()})
              </span>
            </div>
          </div>

          <Link
            to={`/product/${product.id}`}
            className="text-decoration-none text-dark"
          >
            <h5
              className="card-title fw-semibold mb-2"
              style={{
                fontSize: "16px",
                lineHeight: "1.4",
                height: "44px",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {product.title}
            </h5>
          </Link>

          <p
            className="card-text text-muted small mb-2"
            style={{
              height: "40px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description}
          </p>

          {variants.length > 0 && (
            <div className="mb-3">
              <p className="small text-muted mb-2">Size:</p>
              <div className="d-flex gap-2 flex-wrap">
                {variants.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`btn btn-sm rounded-2 ${
                      selectedSize === size
                        ? "btn-dark"
                        : "btn-outline-secondary"
                    }`}
                    style={{
                      minWidth: "36px",
                      height: "32px",
                      fontSize: "12px",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="d-flex align-items-center mb-3">
            <span className="h5 fw-bold text-dark mb-0">${product.price}</span>
            {product.price < 50 && (
              <span className="small text-muted text-decoration-line-through ms-2">
                ${(product.price * 1.47).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        <div className="card-body pt-0 px-3 pb-3">
          <div className="d-grid gap-2 d-md-flex">
            <Link
              to={"/product/" + product.id}
              className="btn btn-outline-dark flex-fill rounded-3 fw-medium d-flex align-items-center justify-content-center text-decoration-none"
              style={{
                height: "44px",
                fontSize: "14px",
                pointerEvents: isOutOfStock ? "none" : "auto",
                background: isOutOfStock ? "#e9ecef" : "",
                color: isOutOfStock ? "#6c757d" : "",
                cursor: isOutOfStock ? "not-allowed" : "pointer",
                opacity: isOutOfStock ? 0.7 : 1,
              }}
              aria-disabled={isOutOfStock}
              tabIndex={isOutOfStock ? -1 : 0}
            >
              Buy Now
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`btn flex-fill rounded-3 fw-medium ${
                isOutOfStock ? "btn-secondary" : ""
              }`}
              style={{
                background: isOutOfStock
                  ? "#e9ecef"
                  : "linear-gradient(135deg, #e91e63, #f06292)",
                color: isOutOfStock ? "#6c757d" : "white",
                border: "none",
                height: "44px",
                fontSize: "14px",
                cursor: isOutOfStock ? "not-allowed" : "pointer",
              }}
            >
              {isOutOfStock ? (
                "Out of Stock"
              ) : (
                <>
                  <i className="fa fa-cart-shopping me-1"></i> Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
