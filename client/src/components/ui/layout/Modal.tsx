export default function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className=" absolute top-0 left-0 bg-[#00000049] w-screen h-screen flex justify-center items-center">
      <div className="p-8 bg-white rounded-md">
        {children}
      </div>
    </div>
  )
}