import sanitizeHtml from "sanitize-html";

export function sanitizeBlogContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "p",
      "a",
      "strong",
      "em",
      "ul",
      "ol",
      "li",
      "blockquote",
      "img",
      "hr",
      "br",
    ],
    allowedAttributes: {
      a: ["href", "target", "rel"],
      img: ["src", "alt", "width", "height"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowProtocolRelative: false,
    transformTags: {
      a: (tagName, attribs) => {
        if (attribs.target === "_blank") {
          attribs.rel = "noopener noreferrer";
        }
        return { tagName, attribs };
      },
    },
    parser: {
      decodeEntities: true,
    },
    disallowedTagsMode: "discard",
  });
}
