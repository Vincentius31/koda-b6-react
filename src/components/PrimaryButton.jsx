export const PrimaryButton = ({ children, onClick, type = "submit" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-[#FF8906] w-full py-3 mt-6 text-white rounded-md hover:bg-primaryHover transition"
    >
      {children}
    </button>
  );
};
