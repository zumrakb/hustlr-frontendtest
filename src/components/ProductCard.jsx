import { useState, useEffect } from "react";
import outOfstockImage from "../asset/outofstock.png";
import { Link } from "react-router-dom";
const ProductCard = ({ product, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [countdown, setCountdown] = useState(24 * 60 * 60); // 24 hours in seconds

  useEffect(() => {
    if (product.price < 50 && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [product.price, countdown]);

  // Format seconds to HH:MM:SS
  const formatCountdown = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, "0");
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };
  // Mock variants/sizes for demonstration
  const variants =
    product.category === "men's clothing" ||
    product.category === "women's clothing"
      ? ["S", "M", "L", "XL"]
      : [];

  const isOutOfStock = product.rating.count < 150; // Mock out of stock logic

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
  };

  const handleAddToCart = () => {
    if (!isOutOfStock && onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <div className="col-md-4 col-sm-6 col-xs-8 col-12 mb-4">
      <div
        className="card h-100 border-0 shadow-sm"
        style={{
          borderRadius: "16px",
          overflow: "hidden",
          transition: "all 0.3s ease",
          position: "relative",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
        }}
      >
        {/* Image Container */}
        <div style={{ position: "relative", background: "#f8f9fa" }}>
          <Link to={`/product/${product.id}`}>
            <img
              className="card-img-top p-3"
              src={product.image}
              alt={product.title}
              style={{
                height: "250px",
                objectFit: "contain",
                transition: "transform 0.3s ease",
                filter: isOutOfStock
                  ? "grayscale(100%) brightness(0.7) blur(2px) contrast(0.8)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isOutOfStock)
                  e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
              }}
            />
          </Link>
          {product.price < 50 ? (
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                padding: "0 8px",
                // height: "28px",
                background: "linear-gradient(135deg, #e91e63, #f06292)",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "600",
                fontSize: "13px",
                zIndex: 2,
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              Flash Sale! Special price available for&nbsp;
              <span style={{ fontFamily: "monospace" }}>
                {formatCountdown(countdown)}
              </span>
            </div>
          ) : (
            product.price > 50 &&
            product.rating.count < 300 &&
            product.rating.count >= 150 && (
              <div
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "0",
                  padding: "5px 8px",
                  width: "100%",
                  background: "rgba(255, 193, 7, 0.95)",
                  color: "#333",
                  display: "flex",
                  alignItems: "center",
                  padding: "0 8px",
                  justifyContent: "center",
                  fontWeight: "600",
                  fontSize: "13px",
                  zIndex: 2,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                }}
              >
                Limited Quantity! Don’t miss out.
              </div>
            )
          )}

          {/* Out of Stock Stamp */}
          {isOutOfStock && (
            <img
              src={outOfstockImage}
              alt="Out of Stock"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "150px",
                opacity: 0.8,
                pointerEvents: "none",
              }}
            />
          )}

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteToggle}
            className="btn btn-light"
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              border: "none",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: isFavorite ? "#e91e63" : "#666",
                fontSize: "18px",
              }}
            >
              {isFavorite ? "♥" : "♡"}
            </span>
          </button>

          {/* Discount Badge */}
          {product.price < 50 && (
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "10px",
                background: "linear-gradient(135deg, #e91e63, #f06292)",
                color: "white",
                padding: "4px 8px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              32% OFF
            </div>
          )}
        </div>

        <div className="card-body" style={{ padding: "20px" }}>
          {/* Category & Rating */}
          <div className="d-flex justify-content-between align-items-center mb-2">
            <span
              style={{
                fontSize: "12px",
                color: "#666",
                textTransform: "capitalize",
                fontWeight: "500",
              }}
            >
              {product.category.replace("'s", "")}
            </span>
            <div className="d-flex align-items-center mb-3">
              <span
                style={{
                  color: "#20c997",
                  fontSize: "14px",
                  fontWeight: "500",
                }}
              >
                ★ {product.rating.rate}
              </span>
              <span
                style={{ color: "#666", fontSize: "14px", marginLeft: "8px" }}
              >
                ({product.rating.count.toLocaleString()})
              </span>
            </div>
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
              outline: "none",
            }}
          >
            <h5
              className="card-title"
              style={{
                fontSize: "16px",
                fontWeight: "600",
                lineHeight: "1.4",
                marginBottom: "8px",
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
          {/* Description */}
          <p
            className="card-text"
            style={{
              fontSize: "14px",
              color: "#666",
              marginBottom: "8px",
              height: "40px",
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
            }}
          >
            {product.description}
          </p>

          {/* Variants/Sizes */}
          {variants.length > 0 && (
            <div className="mb-3">
              <p
                style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}
              >
                Size:
              </p>
              <div className="d-flex gap-2 flex-wrap">
                {variants.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`btn btn-sm ${
                      selectedSize === size
                        ? "btn-dark"
                        : "btn-outline-secondary"
                    }`}
                    style={{
                      minWidth: "36px",
                      height: "32px",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price */}
          <div className="d-flex align-items-center mb-3">
            <span
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: "#333",
              }}
            >
              ${product.price}
            </span>
            {product.price < 50 && (
              <span
                style={{
                  fontSize: "14px",
                  color: "#999",
                  textDecoration: "line-through",
                  marginLeft: "8px",
                }}
              >
                ${(product.price * 1.47).toFixed(2)}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="card-body pt-0" style={{ padding: "0 20px 20px" }}>
          <div className="d-grid gap-2 d-md-flex">
            <Link
              to={"/product/" + product.id}
              className="btn btn-outline-dark w-100 w-md-auto"
              style={{
                borderRadius: "12px",
                fontWeight: "500",
                height: "44px",
                fontSize: "14px",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Buy Now
            </Link>

            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="btn w-100 w-md-auto"
              style={{
                background: isOutOfStock
                  ? "#e9ecef"
                  : "linear-gradient(135deg, #e91e63, #f06292)",
                color: isOutOfStock ? "#6c757d" : "white",
                border: "none",
                borderRadius: "12px",
                fontWeight: "500",
                height: "44px",
                fontSize: "14px",
                cursor: isOutOfStock ? "not-allowed" : "pointer",
              }}
            >
              {isOutOfStock ? (
                "Out of Stock"
              ) : (
                <>
                  <i className="fa fa-cart-shopping mr-1"></i> Add to Cart
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
