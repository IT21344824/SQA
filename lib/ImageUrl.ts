import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/lib/client";
import ImageUrlBuilder from "@sanity/image-url";

const builder = ImageUrlBuilder(client);

export function ImageUrl(source: SanityImageSource) {
    return builder.image(source);
}