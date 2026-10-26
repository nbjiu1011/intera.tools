import type { ToolContent } from "../types";
import type { ToolSlug } from "../../lib/tools";

const content = {
  "compress-image": {
    name: "Compress Image",
    short: "Reduce JPG, PNG and WebP file size in your browser",
    metaTitle: "Compress Image Online – Reduce JPG, PNG & WebP Size Free",
    metaDescription:
      "Compress JPG, PNG and WebP images for free without uploading them. Pick a compression level, see the size saved per file and download all as a ZIP.",
    h1: "Compress Images Online",
    lead: "Make JPG, PNG and WebP files smaller while keeping them looking sharp. Everything runs in your browser, so your photos never leave your device.",
    steps: [
      "Add up to 100 JPG, PNG or WebP images by dropping them onto the page or choosing them from your device.",
      "Pick Light, Balanced or Strong compression, or open the advanced settings to fine-tune the quality.",
      "Check the before and after sizes, then download each file or all of them as a ZIP.",
    ],
    features: [
      {
        title: "Three simple levels",
        body: "Light keeps the best quality, Balanced is the recommended default and Strong aims for the smallest file. JPG and WebP also get an advanced quality slider.",
      },
      {
        title: "Original kept when there's no gain",
        body: "If a compressed file in the same format would not be smaller than your original, Intera Tools keeps the original and marks it as already optimized.",
      },
      {
        title: "Private by design",
        body: "Images are compressed locally in your browser and never uploaded to Intera Tools servers. Location data and other metadata are removed from every re-encoded image.",
      },
    ],
    about: {
      title: "How image compression works in Intera Tools",
      paragraphs: [
        "Photos straight from a phone or camera are often several megabytes, which slows down web pages, bloats email attachments and can exceed the upload limits of online forms. Compressing an image re-encodes it more efficiently, so the file shrinks while the picture still looks the same at normal viewing sizes. Intera Tools shows the original size, the new size and the percentage saved for every file, plus a total for the whole batch.",
        "JPG and WebP images are compressed by adjusting the encoding quality. PNG files work differently: Intera Tools reduces them to an optimized color palette of up to 256 colors, using fewer colors at stronger levels. This is lossy, but the result usually looks very similar to the original and keeps transparency intact. If you want even smaller files, you can switch the output to WebP, a modern format supported by current browsers.",
        "Because everything happens on your device, there is no upload to wait for and no copy of your images on a server. Practical limits depend on your device's memory: up to 100 images per batch and 50 MB per image. When you are done, download the results or send them straight to another tool, such as Resize Image, without uploading them again.",
      ],
    },
    useCases: [
      {
        title: "Photos rejected by an upload form",
        body: "A job portal, school or government form refuses your phone photos because each file is over its size limit. Compression keeps the pixel dimensions and re-encodes the image more efficiently, and the result screen shows every new size so you can check it against the limit before submitting.",
      },
      {
        title: "A slow blog or shop page",
        body: "Your product shots or blog images already have the right dimensions but still make the page heavy. Compress the whole folder in one batch, or turn on Convert to WebP if your site can serve WebP files.",
      },
      {
        title: "Oversized PNG screenshots and graphics",
        body: "Screenshots, charts and interface mockups saved as PNG are often far larger than they need to be. PNG compression reduces them to a palette of up to 256 colors, which suits flat graphics and keeps transparent backgrounds intact.",
      },
    ],
    limits: [
      "Only JPG, PNG and WebP files are accepted, up to 100 per batch and 50 MB each; convert GIF, BMP, AVIF or HEIC images first.",
      "Light, Balanced and Strong use JPG/WebP quality 85, 72 and 55 and PNG palettes of 256, 160 and 64 colors; Advanced allows quality 10–95 and 16–256 colors.",
      "PNG compression is lossy palette quantization, so gradients and photos saved as PNG can show visible banding at lower color counts.",
      "If a re-encoded file in the same format would not be smaller, the original is returned untouched with its metadata; every re-encoded result is saved without EXIF or GPS data.",
      "With Convert to WebP turned on, the WebP result is always used even if it is larger, and the option is unavailable in browsers that cannot create WebP files.",
      "Results keep the original file name (with a .webp extension when converted), and on iPhone and iPad images above about 16.7 megapixels cannot be processed.",
    ],
    faq: [
      {
        q: "Is this image compressor free?",
        a: "Yes. Compressing images is free, with no sign-up, no daily limit and no watermark on your results.",
      },
      {
        q: "Are my images uploaded to a server?",
        a: "No. Compression runs entirely in your browser, so your files are never uploaded to or stored on Intera Tools servers. Results stay in your browser tab until you close it.",
      },
      {
        q: "Will compression reduce image quality?",
        a: "Compression is lossy, but the Light and Balanced levels are designed to keep images looking very close to the original. Choose Light if quality matters most, or Strong when the smallest file size is the goal.",
      },
      {
        q: "Why does a file say “already optimized”?",
        a: "Some images are already compressed efficiently. If the new version would be larger than your original, Intera Tools keeps the original file and labels it already optimized. That untouched original still contains any metadata it had.",
      },
      {
        q: "Does compressing a PNG keep transparency?",
        a: "Yes. PNG files are reduced to an optimized color palette, and transparent areas are preserved.",
      },
    ],
  },

  "resize-image": {
    name: "Resize Image",
    short: "Change image dimensions by pixels or percentage",
    metaTitle: "Resize Image Online – Change Size in Pixels or Percent",
    metaDescription:
      "Resize JPG, PNG and WebP images by exact pixels or by percentage. Lock the aspect ratio, resize a whole batch at once and keep your files private.",
    h1: "Resize Images Online",
    lead: "Change the width and height of one image or a whole batch in a few clicks. Set exact pixels or scale by percentage, right in your browser.",
    steps: [
      "Add the images you want to resize, up to 100 at a time.",
      "Enter a width and height in pixels with the aspect ratio locked, or choose a percentage such as 25%, 50% or 75%.",
      "Resize the batch and download each image or all of them as a ZIP.",
    ],
    features: [
      {
        title: "Pixels or percentage",
        body: "Type exact dimensions with the aspect ratio locked, or scale everything with a 25, 50 or 75 percent preset or a custom value.",
      },
      {
        title: "Batch resizing",
        body: "Apply the same settings to every image in the batch. Turn on “Don't enlarge smaller images” to leave small files at their original size.",
      },
      {
        title: "Sharp results",
        body: "High-quality downsampling keeps edges and fine detail clean when you make images smaller.",
      },
    ],
    about: {
      title: "When and how to resize an image",
      paragraphs: [
        "Many websites, online shops, forms and social platforms expect images of a particular size, and a photo from a modern phone is usually far larger than needed. Resizing reduces the pixel dimensions, which also makes the file noticeably smaller and faster to upload or share. Intera Tools lets you set an exact width and height or scale everything by a percentage, with the aspect ratio locked so nothing looks stretched.",
        "When you resize a batch, every image gets the same settings. If your batch mixes large and small pictures, the “Don't enlarge smaller images” option leaves images that are already smaller than the target untouched, because enlarging adds pixels without adding real detail. JPG, PNG and WebP files keep their original format. GIF, BMP, AVIF and SVG images are saved as PNG, and for animated GIFs only the first frame is used.",
        "Resizing happens locally in your browser, so your images are never uploaded to Intera Tools servers, and metadata such as EXIF and GPS location is removed from the results. After resizing, you can download the files or continue straight to another tool, for example Compress Image, to make them even smaller without uploading them again.",
      ],
    },
    useCases: [
      {
        title: "Matching a required width",
        body: "A shop platform, CMS or application form asks for images of a set width, such as 1000 pixels. Enter that width with Keep aspect ratio on, and every image in the batch gets it while each height follows the image's own proportions.",
      },
      {
        title: "Lighter photos for email",
        body: "Twenty holiday photos straight from a phone are too heavy to email. Scaling the batch to 50% leaves a quarter of the pixels in each photo, which cuts the file sizes considerably without cropping anything.",
      },
      {
        title: "A folder that mixes large and small images",
        body: "Camera photos sit next to small icons and thumbnails. With Don't enlarge smaller images on, only the large files are reduced and the small ones are not blown up into blurry copies.",
      },
    ],
    limits: [
      "Accepts JPG, PNG, WebP, GIF, BMP, AVIF and SVG (HEIC only in browsers that can open it), up to 100 files of 50 MB each.",
      "JPG, PNG and WebP keep their format; GIF, BMP, AVIF, SVG and HEIC are saved as PNG, and animated images keep only their first frame.",
      "JPG and WebP results are re-encoded at quality 92 with no quality setting here, so use Compress Image afterwards if you need smaller files.",
      "With Keep aspect ratio off and both width and height set, every image is stretched to exactly that size; crop first if you need an exact size without distortion.",
      "Custom scaling ranges from 1% to 400%, and enlarging adds pixels but no real detail.",
      "Results are named with the new size, for example photo-1200x800.jpg, and EXIF data including GPS location is not kept.",
    ],
    faq: [
      {
        q: "How do I resize an image without stretching it?",
        a: "Keep the aspect ratio lock turned on. When you change the width, the height is calculated automatically so the proportions stay the same.",
      },
      {
        q: "Can I resize many images at once?",
        a: "Yes. You can add up to 100 images per batch, and the same size settings are applied to all of them.",
      },
      {
        q: "Which formats does the resizer support?",
        a: "JPG, PNG and WebP images keep their format. GIF, BMP, AVIF and SVG images can be resized too and are saved as PNG; animated GIFs use only the first frame.",
      },
      {
        q: "Will resizing make my image blurry?",
        a: "Making an image smaller uses high-quality downsampling to keep it sharp. Enlarging an image beyond its original size cannot add detail, which is why you can choose not to enlarge smaller images.",
      },
      {
        q: "Is it safe to resize private photos here?",
        a: "Yes. Images are processed in your browser and are never uploaded to or stored on Intera Tools servers.",
      },
    ],
  },

  "crop-image": {
    name: "Crop Image",
    short: "Cut out part of a photo with free or fixed ratios",
    metaTitle: "Crop Image Online – Free Photo Cropper with Aspect Ratios",
    metaDescription:
      "Crop JPG, PNG and WebP images in your browser. Drag the crop box, pick a ratio like 1:1, 16:9 or 4:5, or enter exact pixel values. Free, no sign-up.",
    h1: "Crop Images Online",
    lead: "Trim away the parts of a photo you don't need and frame it exactly the way you want. Choose a ratio or set exact pixel coordinates.",
    steps: [
      "Open the image you want to crop.",
      "Drag the crop box or its handles, choose an aspect ratio, or type exact X, Y, width and height values.",
      "Apply the crop and download your image in its original format.",
    ],
    features: [
      {
        title: "Ratio presets",
        body: "Choose Free, 1:1, 4:3, 3:2, 16:9, 4:5 or 9:16 to match profile pictures, posts, stories, slides or prints.",
      },
      {
        title: "Pixel precision",
        body: "Enter exact X, Y, width and height values in pixels, or nudge the crop box with the arrow keys.",
      },
      {
        title: "Same format out",
        body: "JPG, PNG and WebP images are saved in the format they came in, ready to use.",
      },
    ],
    about: {
      title: "Cropping photos for any layout",
      paragraphs: [
        "Cropping removes the edges of an image to focus on the subject, tidy up a composition or fit a required shape. A square 1:1 crop suits profile pictures and many social posts, 4:5 works well for portrait posts, 9:16 matches vertical stories and full-screen phone layouts, and 16:9 fits widescreen slides, video thumbnails and banners. With the Free option you can draw any shape you like.",
        "You can work visually by dragging the box and its handles over the image, or precisely by typing the X and Y position and the width and height in pixels. The arrow keys move the crop box in small steps, which is handy for lining up an edge exactly. The cropper handles one image at a time, so you can frame each picture individually.",
        "Your image is cropped locally in the browser and never uploaded to Intera Tools servers, and metadata such as EXIF and GPS location is removed from the result. The cropper works the same way in desktop, tablet and mobile browsers. When the crop looks right, download it or continue straight to Resize Image or Compress Image without uploading the file again.",
      ],
    },
    useCases: [
      {
        title: "A square profile picture",
        body: "A messenger, forum or company directory wants a square photo. Choose 1:1, move the box over your face and the picture is cut to a square without any scaling.",
      },
      {
        title: "Removing private details from a screenshot",
        body: "Before sharing a screenshot you want to cut away the browser tabs, notifications or a name in the corner. The Free ratio lets you draw any rectangle, and the saved file contains only the area you kept.",
      },
      {
        title: "An exact region for a template",
        body: "A banner slot or document template needs exactly 1200 × 630 pixels taken from a larger photo. Type the width and height, then place the box with the X and Y fields or the arrow keys so the important part is inside.",
      },
    ],
    limits: [
      "Works on one image at a time and accepts JPG, PNG, WebP, GIF, BMP and AVIF files up to 50 MB.",
      "JPG, PNG and WebP keep their format; GIF, BMP and AVIF are saved as PNG, and animated GIFs keep only their first frame.",
      "JPG and WebP are re-encoded at quality 95, while PNG output is lossless.",
      "The crop area is limited to the image itself, so you cannot add extra canvas or padding around the picture.",
      "EXIF orientation is applied before cropping, so coordinates refer to the photo as you see it, and metadata such as GPS location is not kept.",
      "The result is named after the original with -cropped added, for example photo-cropped.jpg.",
    ],
    faq: [
      {
        q: "How do I crop an image to a square?",
        a: "Select the 1:1 ratio preset and the crop box locks to a square. Drag it into position and apply the crop.",
      },
      {
        q: "Can I crop to an exact pixel size?",
        a: "Yes. Enter the X and Y position along with the width and height in pixels to define the crop area exactly.",
      },
      {
        q: "Can I crop several images at once?",
        a: "The cropper works on one image at a time so each picture can be framed individually. To give many images the same dimensions, use Resize Image instead.",
      },
      {
        q: "Does cropping reduce image quality?",
        a: "Cropping only removes the area outside the box; the remaining pixels are not scaled. PNG output stays lossless, while JPG and WebP are saved again at a high quality of 95.",
      },
      {
        q: "Does the cropper work on my phone?",
        a: "Yes. It works in desktop, tablet and mobile browsers with the same features.",
      },
    ],
  },

  "convert-image": {
    name: "Convert Image",
    short: "Convert images to JPG, PNG or WebP",
    metaTitle: "Image Converter – Convert to JPG, PNG or WebP Online",
    metaDescription:
      "Convert WebP, PNG, JPG, GIF, BMP, AVIF and SVG images to JPG, PNG or WebP for free. Batch convert in your browser with adjustable quality, no upload.",
    h1: "Convert Images to JPG, PNG or WebP",
    lead: "Change the format of one image or a whole batch in seconds. Your files are converted in your browser and never uploaded.",
    steps: [
      "Add the images you want to convert, in formats such as JPG, PNG, WebP, GIF, BMP, AVIF or SVG.",
      "Choose JPG, PNG or WebP as the output format and adjust the quality if needed.",
      "Convert and download each file or the whole batch as a ZIP.",
    ],
    features: [
      {
        title: "Many input formats",
        body: "Open JPG, PNG, WebP, GIF, BMP, AVIF and SVG files. Support for some formats depends on your browser, and GIFs use their first frame.",
      },
      {
        title: "Quality control",
        body: "Set the JPG and WebP quality with a slider, starting from a high default of 92.",
      },
      {
        title: "Transparency handled",
        body: "When you convert transparent images to JPG, transparent areas are filled with a background color you choose, white by default.",
      },
    ],
    about: {
      title: "Choosing the right image format",
      paragraphs: [
        "Each image format has its strengths. JPG is the most widely accepted format for photos and keeps files small. PNG is lossless and supports transparency, which makes it a good fit for logos, screenshots and graphics. WebP is a modern format that typically produces smaller files than JPG or PNG at similar quality and is supported by current browsers. Converting lets you match whatever an app, website or form requires.",
        "Intera Tools reads JPG, PNG, WebP, GIF, BMP, AVIF and SVG images and saves them as JPG, PNG or WebP. Some input formats depend on what your browser can open: HEIC photos, for example, can only be opened in Safari. Animated GIFs are converted using their first frame. Because JPG has no transparency, transparent areas are filled with a background color of your choice when you convert to JPG.",
        "Conversion happens entirely in your browser, so there is no upload and no copy of your files on a server. Metadata such as EXIF and GPS location is removed from the converted images. You can convert up to 100 images per batch, download them all as a ZIP, or send them straight to Compress Image to reduce their size further.",
      ],
    },
    useCases: [
      {
        title: "A mixed folder that needs one format",
        body: "You collected WebP images from websites, PNG screenshots and a BMP from an old scanner, and a presentation or archive needs them all as JPG. Add the whole mix and convert it in one batch.",
      },
      {
        title: "WebP copies for a website",
        body: "Your site can serve WebP and you want WebP versions of existing JPG and PNG assets. Choose WebP, set the quality and download the batch as a ZIP; transparent PNG backgrounds are kept.",
      },
      {
        title: "Turning an SVG logo into a PNG",
        body: "A form, office app or social profile won't accept an SVG logo. Converting it to PNG gives you a regular image file with its transparent background intact.",
      },
    ],
    limits: [
      "Reads JPG, PNG, WebP, GIF, BMP, AVIF and SVG, plus HEIC/HEIF in browsers that can decode it (currently Safari), up to 100 files of 50 MB each.",
      "The quality slider (10–100, default 92) applies to JPG and WebP; PNG is saved losslessly with the browser's default compression and has no size setting.",
      "Images are drawn on a standard sRGB canvas, so embedded color profiles and all metadata are dropped, and very saturated colors in wide-gamut photos may look slightly less vivid.",
      "Animated GIF and WebP files keep only their first frame, and SVGs without a set size are rendered at 1024 × 1024 pixels.",
      "WebP output is disabled in browsers that cannot create WebP files.",
      "Converted files keep their name with the new extension, so photo.png becomes photo.jpg.",
    ],
    faq: [
      {
        q: "Which output format should I choose?",
        a: "JPG suits photos that must open everywhere, PNG suits graphics, screenshots and anything that needs lossless quality or transparency, and WebP gives the smallest files for websites. To see the actual sizes for your own image, try the Image Format Comparison tool.",
      },
      {
        q: "Can I convert HEIC photos from an iPhone?",
        a: "HEIC files can only be opened in Safari, because other browsers cannot decode them. In Safari you can convert them to JPG, PNG or WebP like any other image.",
      },
      {
        q: "What happens to transparency when converting to JPG?",
        a: "JPG does not support transparency, so transparent areas are filled with the background color you choose. White is used by default.",
      },
      {
        q: "Can I convert multiple images at once?",
        a: "Yes. Add up to 100 images and they are all converted to the format you select.",
      },
      {
        q: "Are my images uploaded anywhere?",
        a: "No. Images are converted locally in your browser and are never uploaded to or stored on Intera Tools servers.",
      },
    ],
  },

  "jpg-to-png": {
    name: "JPG to PNG",
    short: "Convert JPG photos to lossless PNG files",
    metaTitle: "JPG to PNG Converter – Convert JPG to PNG Online Free",
    metaDescription:
      "Convert JPG and JPEG images to PNG for free in your browser. Batch convert without uploading files, then download each PNG or all of them as a ZIP.",
    h1: "Convert JPG to PNG",
    lead: "Turn JPG and JPEG photos into PNG files for editing, design work or uploads that require PNG. Conversion runs in your browser, with no upload.",
    steps: [
      "Add one or more JPG or JPEG images.",
      "Check that PNG is selected as the output format.",
      "Convert the images and download each PNG or all of them as a ZIP.",
    ],
    features: [
      {
        title: "Lossless output",
        body: "PNG stores every pixel without further compression loss, so you can edit and save it again and again without adding new artifacts.",
      },
      {
        title: "Batch conversion",
        body: "Convert up to 100 JPG images at once and download them together as a ZIP.",
      },
      {
        title: "Private conversion",
        body: "Your photos are converted on your own device and never uploaded to Intera Tools servers.",
      },
    ],
    about: {
      title: "Why convert JPG to PNG?",
      paragraphs: [
        "JPG is ideal for sharing photos because it keeps files small, but each time a JPG is edited and saved again it loses a little more quality. PNG is a lossless format, so converting to PNG gives you a stable copy that can be edited, annotated or layered in design tools repeatedly without adding new compression artifacts. Some websites, apps and print services also ask specifically for PNG uploads.",
        "It helps to know what converting does and does not do. A PNG is usually larger than the JPG it came from, because lossless compression keeps all of the pixel data. Converting also cannot restore detail that was lost when the JPG was created, so the PNG looks the same as the original JPG rather than sharper. The background will not become transparent either, since the JPG never had transparency.",
        "The conversion happens in your browser, and metadata such as EXIF and GPS location is removed from the new files. If you need a different output format, open the full Convert Image tool. If the PNG files end up too large for your needs, you can send them straight to Compress Image without uploading them again.",
      ],
    },
    useCases: [
      {
        title: "A working copy for repeated edits",
        body: "You will mark up a JPG screenshot or photo several times and save it after each round. Converting it to PNG first means later saves don't stack new JPG artifacts on top of the existing ones.",
      },
      {
        title: "An upload that only accepts PNG",
        body: "Some print shops, merchandise makers, design templates and developer asset pipelines take PNG files only. Convert the JPG you have instead of re-exporting it from the original app.",
      },
      {
        title: "A photo that shows sideways in some apps",
        body: "A JPG looks upright on your phone but sideways elsewhere because its rotation is only stored as an EXIF tag. The PNG is saved with the rotation applied to the pixels, so it looks the same in every program.",
      },
    ],
    limits: [
      "PNG is lossless, so a converted photo is usually much larger than the JPG it came from, and the browser's PNG encoder offers no compression setting.",
      "Existing JPG artifacts are kept exactly as they are; converting cannot restore detail or make the background transparent.",
      "WebP, GIF, BMP, AVIF and SVG files can be added too and are saved as PNG.",
      "EXIF orientation is applied to the pixels, and all metadata, including camera details and GPS location, is removed.",
      "Files keep their name with a .png extension, with up to 100 images of 50 MB each per batch.",
      "If the PNG is too large, Compress Image can reduce it to a 256-color palette, which suits graphics better than photos.",
    ],
    faq: [
      {
        q: "Why is my PNG larger than the original JPG?",
        a: "PNG uses lossless compression, which keeps all of the pixel data instead of discarding some like JPG does. That is why PNG files made from photos are usually larger.",
      },
      {
        q: "Will converting JPG to PNG improve quality?",
        a: "No. Converting cannot bring back detail lost to JPG compression. The PNG preserves the image exactly as it is, so it won't lose more quality when edited and saved again.",
      },
      {
        q: "Does converting JPG to PNG make the background transparent?",
        a: "No. JPG images have no transparency, so the PNG keeps the same background. Transparency would have to be added afterwards in an image editor.",
      },
      {
        q: "Is JPEG the same as JPG?",
        a: "Yes. JPG and JPEG are two file extensions for the same format, and both can be converted to PNG here.",
      },
      {
        q: "Will the PNG keep my photo's orientation?",
        a: "Yes. The EXIF orientation is applied when the JPG is loaded, so the PNG is saved upright with the rotation built into the pixels. The orientation tag itself and other metadata are not copied.",
      },
    ],
  },

  "png-to-jpg": {
    name: "PNG to JPG",
    short: "Convert PNG images to smaller JPG files",
    metaTitle: "PNG to JPG Converter – Convert PNG to JPG Online Free",
    metaDescription:
      "Convert PNG images to JPG for free and get much smaller files. Pick a background color for transparent areas, set the quality and convert in batches.",
    h1: "Convert PNG to JPG",
    lead: "Turn PNG images into JPG files that are smaller and accepted almost everywhere. Choose the quality and the color used for transparent areas.",
    steps: [
      "Add one or more PNG images.",
      "Choose a background color for transparent areas and adjust the JPG quality if needed.",
      "Convert and download each JPG or all of them as a ZIP.",
    ],
    features: [
      {
        title: "Smaller files",
        body: "Photos and screenshots saved as PNG are often much larger than they need to be. As JPG they usually take up far less space.",
      },
      {
        title: "Background for transparency",
        body: "JPG can't store transparency, so transparent areas are filled with a color you pick. White is the default.",
      },
      {
        title: "Adjustable quality",
        body: "Use the quality slider to balance image sharpness against file size.",
      },
    ],
    about: {
      title: "Why convert PNG to JPG?",
      paragraphs: [
        "PNG is a lossless format, which is great for graphics but means photos and detailed screenshots saved as PNG can be very large. JPG uses lossy compression designed for photographic images, so the same picture is usually much smaller as a JPG. Smaller files upload faster, fit within attachment and form size limits, and work with practically every website, app and device.",
        "The main thing to watch is transparency. JPG has no transparent pixels, so any see-through areas in your PNG, such as the background around a logo, are filled with a solid color. White is used by default, and you can choose a different color to match where the image will be used. If you need to keep transparency, stay with PNG or convert to WebP with the Convert Image tool instead.",
        "The quality slider controls how much compression is applied: higher values keep more detail, lower values make smaller files. Conversion happens in your browser with no upload, and metadata such as EXIF and GPS location is removed. You can convert up to 100 PNG files per batch and download them all together as a ZIP.",
      ],
    },
    useCases: [
      {
        title: "Screenshots too large to attach",
        body: "A handful of full-screen PNG screenshots of photos or web pages can add up to tens of megabytes. As JPG they usually take far less space and attach to email or chat without trouble.",
      },
      {
        title: "A transparent logo for a JPG-only system",
        body: "Your logo is a transparent PNG, but an older CMS or a print order form only accepts JPG. Set the background color to match where the logo will sit, so its edges blend in instead of showing a white box.",
      },
      {
        title: "Photos exported as PNG by mistake",
        body: "A design app or phone editor saved your photos as PNG. Converting them to JPG at a quality around 85–92 gives files that are hard to tell apart at normal viewing size and open everywhere.",
      },
    ],
    limits: [
      "JPG cannot store transparency, so transparent and semi-transparent pixels are blended onto the chosen background color, white by default.",
      "Quality ranges from 10 to 100 with a default of 92; lower values make smaller files but add visible blocky artifacts.",
      "Sharp text, thin lines and flat-color graphics can show halos in JPG, and simple graphics may even end up larger than an optimized PNG.",
      "WebP, GIF, BMP, AVIF and SVG files can be added as well, and animated images keep only their first frame.",
      "Files keep their name with a .jpg extension, and metadata such as EXIF and GPS location is not carried over.",
    ],
    faq: [
      {
        q: "What happens to a transparent background when converting PNG to JPG?",
        a: "JPG does not support transparency, so transparent areas are filled with a background color. White is used by default, and you can choose another color before converting.",
      },
      {
        q: "Will my JPG be smaller than the PNG?",
        a: "Usually yes, and often much smaller, especially for photos. Simple graphics with few colors may show less of a difference.",
      },
      {
        q: "Does converting PNG to JPG reduce quality?",
        a: "JPG is a lossy format, so some fine detail is discarded. At a high quality setting the difference is usually hard to see.",
      },
      {
        q: "Can I convert many PNG files at once?",
        a: "Yes. Add up to 100 PNG images per batch and download the results individually or as a ZIP.",
      },
      {
        q: "Which background color should I choose?",
        a: "Pick the color of the page or slide where the image will appear. Semi-transparent edges, such as smoothed logo outlines or soft shadows, are blended with that color, so a matching background avoids a visible fringe.",
      },
    ],
  },

  "webp-to-jpg": {
    name: "WebP to JPG",
    short: "Convert WebP images to widely supported JPG",
    metaTitle: "WebP to JPG Converter – Convert WebP to JPG Online Free",
    metaDescription:
      "Convert WebP images to JPG for free when an app or website won't accept WebP. Batch convert in your browser with no upload and adjustable quality.",
    h1: "Convert WebP to JPG",
    lead: "Saved an image as WebP and now it won't open or upload where you need it? Convert it to JPG, the format that works almost everywhere.",
    steps: [
      "Add one or more WebP images.",
      "Adjust the JPG quality and the background color for transparent areas if needed.",
      "Convert and download each JPG or all of them as a ZIP.",
    ],
    features: [
      {
        title: "Works almost everywhere",
        body: "JPG is accepted by practically every app, website, editor and device, including older software that can't open WebP.",
      },
      {
        title: "Batch conversion",
        body: "Convert up to 100 WebP files at once and download them together as a ZIP.",
      },
      {
        title: "No upload",
        body: "WebP files are converted locally in your browser and never sent to Intera Tools servers.",
      },
    ],
    about: {
      title: "Why convert WebP to JPG?",
      paragraphs: [
        "WebP is a modern image format that many websites use because it keeps files small. When you save an image from a web page, you may end up with a .webp file that some apps, older image editors, online forms or upload fields don't accept. Converting it to JPG gives you a file in the most widely supported photo format, so you can edit, share, print or upload it without compatibility problems.",
        "WebP can contain transparency but JPG cannot, so transparent areas are filled with a background color you choose, white by default. Some WebP files are animated; in that case the first frame is converted to a still JPG image. The quality slider balances detail against file size, and the JPG may be somewhat larger than the original WebP, because WebP usually compresses more efficiently.",
        "All conversion happens in your browser with no upload, and metadata such as EXIF and GPS location is removed from the results. You can convert up to 100 WebP files per batch and download them individually or together as a ZIP. If you need a PNG instead, for example to keep transparency, use the Convert Image tool and choose PNG as the output format.",
      ],
    },
    useCases: [
      {
        title: "An image saved from a website won't open",
        body: "You saved an image from a shop or news site and got a .webp file that your photo viewer, an older image editor or an office app won't open. Converting it to JPG makes it usable almost anywhere.",
      },
      {
        title: "A form that rejects WebP",
        body: "An older message board, application form or intranet accepts only JPG or PNG uploads. A JPG at the default quality goes through where the WebP file was refused.",
      },
      {
        title: "WebP product images from a supplier",
        body: "A supplier sent product photos as WebP, but your inventory system or print shop needs JPG. Convert the whole folder at once and download the results as a ZIP.",
      },
    ],
    limits: [
      "Animated WebP files are converted using only their first frame.",
      "Transparent areas are filled with the chosen background color, white by default; use Convert Image with PNG output to keep transparency.",
      "Converting a lossy WebP to JPG adds a second lossy step, so keep the quality high (the default is 92) to avoid visible new artifacts.",
      "The JPG is often larger than the WebP, because JPG compresses less efficiently at a similar quality.",
      "Opening WebP requires browser support, which all current major browsers have; very old browser versions may report that the image can't be opened.",
      "Files keep their name with a .jpg extension, and EXIF and GPS metadata are not kept.",
    ],
    faq: [
      {
        q: "Why can't I open WebP images?",
        a: "Some older apps, editors and websites do not support the WebP format. Converting the file to JPG makes it compatible with practically any software.",
      },
      {
        q: "What happens to animated WebP files?",
        a: "Only the first frame is used, so an animated WebP becomes a single still JPG image.",
      },
      {
        q: "Will the JPG be larger than the WebP file?",
        a: "It can be, because WebP often compresses more efficiently than JPG. Lowering the quality slider makes the JPG smaller.",
      },
      {
        q: "What happens to transparency?",
        a: "JPG does not support transparency, so transparent areas are filled with a background color. White is used by default.",
      },
      {
        q: "Why do images I save from websites end up as WebP?",
        a: "Many websites deliver WebP to browsers that support it because the files are smaller, so saving an image often gives you a .webp file even when the site also has a JPG version. Converting it here gives you a JPG without hunting for another copy.",
      },
    ],
  },

  "rotate-image": {
    name: "Rotate Image",
    short: "Rotate or flip images by 90° or 180°",
    metaTitle: "Rotate Image Online – Rotate & Flip Photos Free",
    metaDescription:
      "Rotate images 90° left or right, turn them 180°, or flip them horizontally or vertically. Fix sideways photos in a batch, free, right in your browser.",
    h1: "Rotate and Flip Images",
    lead: "Fix sideways or upside-down photos and mirror images in a few clicks. Rotate one image or a whole batch at once.",
    steps: [
      "Add the images you want to rotate or flip.",
      "Rotate left or right by 90°, turn by 180°, or flip horizontally or vertically, for all images or one at a time.",
      "Apply the changes and download each image or all of them as a ZIP.",
    ],
    features: [
      {
        title: "Rotate and flip",
        body: "Turn images 90° left or right or 180°, and flip them horizontally or vertically to create a mirror image.",
      },
      {
        title: "All at once or one by one",
        body: "Apply the same rotation to every image in the batch, or adjust individual images separately.",
      },
      {
        title: "Quality preserved",
        body: "PNG images stay lossless. JPG and WebP files are re-encoded at high quality, so the change is very hard to notice.",
      },
    ],
    about: {
      title: "Fixing sideways and mirrored photos",
      paragraphs: [
        "Photos from phones and cameras sometimes appear sideways or upside down because the device recorded its orientation in the EXIF data instead of rotating the pixels. Intera Tools applies that EXIF orientation automatically when the image is loaded, so you start from what the photo should look like and can rotate it further if needed. The saved result has the correct orientation built into the image itself.",
        "Flipping is useful for mirrored selfies, scanned documents or matching the direction of a design. You can rotate or flip every image in the batch with a single click, or adjust images individually when only a few are wrong. Rotating in 90° steps keeps the whole picture without cropping; the width and height simply swap where needed.",
        "PNG files stay lossless when rotated. JPG and WebP images are re-encoded at high quality, which is not bit-for-bit lossless, but the difference is very hard to see. Processing happens locally in your browser with no upload, metadata such as EXIF and GPS location is removed, and you can process up to 100 images per batch.",
      ],
    },
    useCases: [
      {
        title: "Document photos taken sideways",
        body: "You photographed receipts or a whiteboard and some shots came out sideways. Turn only those with the buttons under each image, then save the whole batch in one go.",
      },
      {
        title: "A mirrored selfie",
        body: "Some phones save front-camera photos mirrored, so text on a shirt or sign reads backwards. Flip horizontal makes the text readable again.",
      },
      {
        title: "Album scans fed in upside down",
        body: "A stack of prints went through the scanner upside down. Rotate 180° under All images fixes every file with one click.",
      },
    ],
    limits: [
      "Rotation works in 90° steps and flips are horizontal or vertical; free-angle rotation or straightening a tilted horizon is not available.",
      "Accepts JPG, PNG, WebP, GIF, BMP, AVIF and SVG (HEIC only where the browser can open it); formats other than JPG, PNG and WebP are saved as PNG.",
      "PNG stays lossless, while JPG and WebP are re-encoded at quality 95, so the result is not bit-for-bit identical.",
      "EXIF orientation is applied when an image is loaded, and all metadata, including GPS location, is removed from the saved files.",
      "Saving needs at least one change; to bake in the orientation of a photo that already looks upright here, re-save it with Convert Image instead.",
      "Files are saved with -rotated added to the name, with up to 100 images of 50 MB each per batch.",
    ],
    faq: [
      {
        q: "Why does my photo appear sideways?",
        a: "Many cameras store orientation as EXIF metadata instead of rotating the image itself, and some apps ignore it. Intera Tools applies the orientation when loading the photo, and saving it here writes the correct orientation into the image.",
      },
      {
        q: "Can I rotate multiple images at once?",
        a: "Yes. You can apply a rotation or flip to all images in the batch at once, or change images one by one.",
      },
      {
        q: "Is rotating a JPG lossless?",
        a: "Not bit-for-bit. JPGs are re-encoded at high quality, so the difference is very hard to notice. PNG images stay lossless.",
      },
      {
        q: "How do I mirror an image?",
        a: "Use flip horizontal to mirror the image from left to right, or flip vertical to mirror it from top to bottom.",
      },
      {
        q: "Does it work on mobile?",
        a: "Yes. Rotating and flipping work in mobile, tablet and desktop browsers with the same features.",
      },
    ],
  },

  "watermark-image": {
    name: "Watermark Image",
    short: "Add a text or logo watermark to your photos",
    metaTitle: "Add Watermark to Image Online – Text or Logo, Free",
    metaDescription:
      "Add a text or logo watermark to your photos for free. Set the position, size, opacity and rotation, or tile it across the image, with a live preview.",
    h1: "Add a Watermark to Your Images",
    lead: "Brand and protect your photos with a text or logo watermark. See every change in a live preview, then apply it to the whole batch.",
    steps: [
      "Add the images you want to watermark.",
      "Choose a text or logo watermark and adjust its size, opacity, rotation and position while watching the live preview.",
      "Apply the watermark to all images and download them individually or as a ZIP.",
    ],
    features: [
      {
        title: "Text or logo",
        body: "Type your own text in a sans, serif or mono style and any color, or place an image such as your logo. A PNG with transparency works best for logos.",
      },
      {
        title: "Position or tile",
        body: "Place the watermark on a 3×3 grid, such as a corner or the center, or repeat it as a tiled pattern across the whole image.",
      },
      {
        title: "One setup, whole batch",
        body: "The same settings are applied to every image in the batch, and JPG, PNG and WebP files keep their original format.",
      },
    ],
    about: {
      title: "Watermarking photos the simple way",
      paragraphs: [
        "A watermark shows who made an image and makes it harder to reuse without credit. Photographers, online sellers and anyone sharing original work often add a name, website address or logo before posting. A small, semi-transparent mark in a corner keeps the photo clean, while a tiled pattern across the whole image is much harder to crop out or remove.",
        "For a text watermark you can set the wording, font style (sans, serif or mono), size relative to the image, color, opacity and rotation. For a logo watermark, add an image, ideally a PNG with a transparent background, and set its size as a percentage of the image width along with its opacity. Both types can be placed on a 3×3 grid or tiled, and a live preview shows the result as you adjust.",
        "Because the size is relative to each image, the watermark keeps the same proportions across photos with different dimensions. Everything is processed in your browser, so neither your photos nor your logo are uploaded to Intera Tools servers, and metadata such as EXIF and GPS location is removed from the results.",
      ],
    },
    useCases: [
      {
        title: "Proofs for a client",
        body: "A photographer sends preview images before the final delivery. A semi-transparent name tiled across each photo makes the proofs hard to use as finished pictures.",
      },
      {
        title: "A logo on social and blog images",
        body: "A small business adds its logo to the bottom-right corner of every post image. Because the size is relative to each picture, the logo looks the same on square and landscape photos.",
      },
      {
        title: "Marking a copy of an ID",
        body: "Before sending a copy of an ID card or passport to a landlord or service, add text such as “For rental application only” across it, so the copy is harder to reuse for something else.",
      },
    ],
    limits: [
      "Photos can be JPG, PNG, WebP, GIF, BMP or AVIF, while the logo can be any image your browser opens, including SVG.",
      "JPG, PNG and WebP keep their format and GIF, BMP and AVIF are saved as PNG; JPG and WebP are re-encoded at quality 92.",
      "Text size is a percentage of each image's shorter side and logo width a percentage of the image width, so the mark scales with every photo.",
      "Text is drawn with the fonts available in your browser, so the exact typeface can differ slightly between devices.",
      "The watermark becomes part of the pixels and cannot be removed from the saved file later, so keep your originals.",
      "Results are named with -watermarked added, and metadata such as EXIF and GPS location is removed.",
    ],
    faq: [
      {
        q: "Can I add my logo as a watermark?",
        a: "Yes. Choose the image watermark option and add your logo. A PNG with a transparent background gives the cleanest result.",
      },
      {
        q: "Can I watermark multiple photos at once?",
        a: "Yes. Add up to 100 images and the same watermark settings are applied to all of them.",
      },
      {
        q: "How do I make a watermark harder to remove?",
        a: "Use the tiled option to repeat the watermark across the entire image, which makes it much harder to crop out.",
      },
      {
        q: "Does Intera Tools add its own watermark?",
        a: "No. Intera Tools never adds its own watermark to your results; only the watermark you design is applied.",
      },
      {
        q: "Are my photos uploaded?",
        a: "No. Watermarks are applied in your browser, and your images are never uploaded to or stored on Intera Tools servers.",
      },
    ],
  },

  "image-format-comparison": {
    name: "Image Format Comparison",
    short: "Compare JPG, PNG and WebP sizes for one image",
    metaTitle: "JPG vs PNG vs WebP – Compare Image Format Sizes",
    metaDescription:
      "Encode one image as JPG, PNG, PNG-8 and WebP in your browser and compare file size, transparency and quality side by side. Free, private, nothing uploaded.",
    h1: "Compare Image Formats: JPG vs PNG vs WebP",
    lead: "See which format makes your image smallest without visible damage. One image is encoded as JPG, PNG, PNG-8 and WebP right in your browser, so you can compare sizes and quality side by side.",
    steps: [
      "Add one image of up to 50 MB by dropping it onto the page or choosing it from your device.",
      "Set the quality for JPG and WebP, then compare each version's size, its difference from the original and whether transparency is kept.",
      "Check the versions side by side and download the one that suits your use.",
    ],
    features: [
      {
        title: "Four encodings at once",
        body: "JPG, lossless PNG, 256-color PNG-8 and WebP are all made from the same decoded pixels, so the comparison is fair.",
      },
      {
        title: "Numbers you can act on",
        body: "Each version shows its file size, how much smaller or larger it is than your original, and whether transparency survives.",
      },
      {
        title: "See before you choose",
        body: "A side-by-side view lets you check edges, text and gradients, then download whichever version works best.",
      },
    ],
    about: {
      title: "How to read the comparison",
      paragraphs: [
        "Every version is encoded from the same decoded image, so differences in size come from the format and its settings alone. The percentage compares each result with the file you added, which tells you at a glance whether switching formats saves anything. The transparency indicator shows whether see-through areas are kept: PNG, PNG-8 and WebP can store transparency, while JPG fills it with white. If your image has no transparent pixels, you can ignore that and focus on size and appearance.",
        "File size alone doesn't decide the winner, so compare the versions at the size the image will actually be shown. At lower quality settings JPG shows blocky patches and halos around sharp edges and text. PNG-8 limits the image to 256 colors: logos, icons and screenshots often look identical, but photos and smooth gradients can show banding. Lossless PNG keeps every pixel and is usually the largest option for photos. WebP often gives the smallest file at a similar quality and also keeps transparency, but some older software still can't open it.",
        "The sizes reflect the encoders built into the browser you are using. Chrome, Firefox and Safari can produce different sizes from the same setting, and dedicated tools such as mozjpeg, cwebp or PNG optimizers can often make the same image smaller. The lossless PNG here uses the browser's default compression with no level setting, so it can come out larger than an original PNG that was already optimized; that doesn't mean PNG is the wrong format for the image. Treat the results as a fair comparison between formats on your device, not as the smallest size each format could ever reach.",
      ],
    },
    useCases: [
      {
        title: "Choosing a format for a website image",
        body: "Before publishing a large banner or product photo, check how much WebP saves over JPG at the same quality setting and whether you can see any difference, then download the version you will use.",
      },
      {
        title: "A logo or icon with transparency",
        body: "Compare lossless PNG, PNG-8 and WebP for a logo to see whether 256 colors are enough and which format keeps the transparent edges clean at the smallest size.",
      },
      {
        title: "Getting under an upload limit",
        body: "A portal accepts images only up to a certain size. Lower the quality step by step and see which format drops below the limit first while the image still looks acceptable.",
      },
    ],
    limits: [
      "One image at a time, up to 50 MB.",
      "The quality slider applies to JPG and WebP only; PNG is lossless, and PNG-8 uses a palette of up to 256 colors made by the same quantizer as Compress Image.",
      "The lossless PNG is re-encoded by the browser without a compression level setting, so it is often larger than an original that was already optimized.",
      "JPG fills transparent areas with white, while PNG, PNG-8 and WebP keep transparency.",
      "If your browser cannot create WebP files, as with some Safari versions, WebP is shown as unsupported.",
      "No version keeps the original metadata, and sizes depend on your browser's encoders, so other tools can produce different results.",
    ],
    faq: [
      {
        q: "Which format is best for photos?",
        a: "For photos, WebP usually produces the smallest file at a similar visual quality, while JPG is the safest choice when the image must open everywhere. Lossless PNG is rarely worth it for photos because the files get large. Results vary from image to image, which is exactly what the comparison shows.",
      },
      {
        q: "Why is the PNG larger than my original PNG?",
        a: "Your original may have been optimized with a dedicated tool or saved with a color palette. The browser writes a lossless PNG without that extra optimization, so it can come out larger. Look at the PNG-8 result, or use Compress Image to shrink a PNG.",
      },
      {
        q: "Does PNG-8 keep transparency?",
        a: "Yes. PNG-8 reduces the image to at most 256 colors but keeps transparent areas, the same way Compress Image handles PNG files.",
      },
      {
        q: "Why is WebP shown as unsupported?",
        a: "Your browser cannot create WebP files, which happens in some browsers such as certain Safari versions. Open the page in a current version of Chrome, Edge or Firefox to include WebP in the comparison.",
      },
      {
        q: "Is my image uploaded?",
        a: "No. All versions are encoded in your browser, and the image is never uploaded to or stored on Intera Tools servers.",
      },
    ],
  },
} satisfies Partial<Record<ToolSlug, ToolContent>>;

export default content;
