export const PrimaryButton = (btn) => {
  return (
    <button
      type="submit"
      className="bg-[#FF8906] w-full py-3 mt-6 bg-primary text-white rounded-md hover:bg-primaryHover transition"
    >{btn.children}</button>
  )
}

