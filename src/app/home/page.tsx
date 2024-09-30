import HomeProducts from "@/components/HomeProducts";
import HomeServices from "@/components/HomeServices";
import HomeTechnology from "@/components/HomeTechnology";

export default function page() {
  return (
    <div className="flex-col">
      <HomeProducts/>
      <HomeServices/>
      <HomeTechnology/>
    </div>
  )
}
