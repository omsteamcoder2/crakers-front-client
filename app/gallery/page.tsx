import PageHeader from "@/components/common/PageHeader"
import GalleryGrid from "@/components/sections/GalleryGrid"

export default function GalleryPage() {
  return (
    <div>
      <PageHeader
        title="Gallery"
        subtitle="Witness the magic of our fireworks in action"
      />
      <GalleryGrid />
    </div>
  )
}
