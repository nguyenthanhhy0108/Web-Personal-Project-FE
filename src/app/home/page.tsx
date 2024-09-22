import HomeProducts from "@/components/HomeProducts";
import HomeServices from "@/components/HomeServices";

export default function page() {
  return (
    <div className="flex-col">
      <HomeProducts/>
      <HomeServices/>
    </div>
  )
}
