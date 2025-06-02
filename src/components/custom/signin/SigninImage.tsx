export default function SigninImage() {
  return (
    <div className="w-full md:w-[50%] h-full flex justify-center items-center bg-white">
      <img
        src="/auto.png"
        alt="Car Image"
        className="w-full h-full object-cover"
        style={{
          display: "block",
          margin: 0,
          padding: 0,
          objectPosition: "right",
          background: "#fff",
        }}
      />
    </div>
  );
}
