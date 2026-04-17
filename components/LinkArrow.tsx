/**
 * LinkArrow
 * Animated diagonal arrow for link cards.
 * The parent element must have the `group` Tailwind class.
 *
 * On hover:
 *  - Arrow 1 exits toward top-right  (translate +X, -Y)
 *  - Arrow 2 enters from bottom-left (translate -X, +Y → 0,0)
 * On leave: both reverse back to their rest positions.
 */

interface LinkArrowProps {
  className?: string;
}

const LinkArrow: React.FC<LinkArrowProps> = ({ className = "absolute bottom-7 right-6 h-8 w-8" }) => {
  return (
    <div className={`${className} overflow-hidden`}>
      {/* Arrow 1 – rests at center, exits top-right on hover */}
      <img
        src="/icons/link_arrow.svg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full transition-transform duration-300 ease-in-out
                   group-hover:translate-x-full group-hover:-translate-y-full"
      />
      {/* Arrow 2 – starts at bottom-left, enters center on hover */}
      <img
        src="/icons/link_arrow.svg"
        alt="Link Arrow"
        className="absolute inset-0 h-full w-full transition-transform duration-300 ease-in-out
                   -translate-x-full translate-y-full
                   group-hover:translate-x-0 group-hover:translate-y-0"
      />
    </div>
  );
};

export default LinkArrow;
