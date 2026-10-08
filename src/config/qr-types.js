// ============================================
// QR Types — data schema + encoder
// Every generator UI reads from this file.
// ============================================

export const QR_TYPES = {
  url: {
    id: "url",
    label: "URL",
    icon: "Link",
    fields: [
      {
        name: "url",
        label: "Website URL",
        placeholder: "https://example.com",
        type: "url",
        required: true,
      },
    ],
  },

  text: {
    id: "text",
    label: "Text",
    icon: "Type",
    fields: [
      {
        name: "text",
        label: "Plain Text",
        placeholder: "Type anything...",
        type: "textarea",
        required: true,
      },
    ],
  },

  email: {
    id: "email",
    label: "Email",
    icon: "Mail",
    fields: [
      {
        name: "to",
        label: "Recipient",
        placeholder: "hello@example.com",
        type: "email",
        required: true,
      },
      {
        name: "subject",
        label: "Subject",
        placeholder: "Hello",
        type: "text",
      },
      {
        name: "body",
        label: "Message",
        placeholder: "Write your message...",
        type: "textarea",
      },
    ],
  },

  phone: {
    id: "phone",
    label: "Phone",
    icon: "Phone",
    fields: [
      {
        name: "number",
        label: "Phone Number",
        placeholder: "+1 555 123 4567",
        type: "tel",
        required: true,
      },
    ],
  },

  wifi: {
    id: "wifi",
    label: "Wi-Fi",
    icon: "Wifi",
    fields: [
      {
        name: "ssid",
        label: "Network Name (SSID)",
        placeholder: "MyNetwork",
        type: "text",
        required: true,
      },
      {
        name: "password",
        label: "Password",
        placeholder: "••••••••",
        type: "text",
      },
      {
        name: "encryption",
        label: "Security",
        type: "select",
        options: [
          { value: "WPA", label: "WPA / WPA2 / WPA3" },
          { value: "WEP", label: "WEP" },
          { value: "nopass", label: "None (open network)" },
        ],
        default: "WPA",
      },
    ],
  },
};

// Ordered list — controls tab order in UI
export const QR_TYPE_ORDER = ["url", "text", "email", "phone", "wifi"];

// ============================================
// Encoders — turn form values into QR string
// ============================================

/**
 * Escape special characters for Wi-Fi QR spec.
 * Characters \\ ; , : " must be backslash-escaped.
 */
function escapeWifi(str = "") {
  return String(str).replace(/([\\;,:"])/g, "\\$1");
}

/**
 * Turn { type, values } into the string that will be encoded in the QR.
 * Returns "" if required data is missing (so UI can disable the preview).
 */
export function encodeQRData(type, values = {}) {
  switch (type) {
    case "url":
      return values.url?.trim() || "";

    case "text":
      return values.text?.trim() || "";

    case "email": {
      if (!values.to?.trim()) return "";
      const params = new URLSearchParams();
      if (values.subject?.trim()) params.set("subject", values.subject.trim());
      if (values.body?.trim()) params.set("body", values.body.trim());
      const qs = params.toString();
      return `mailto:${values.to.trim()}${qs ? `?${qs}` : ""}`;
    }

    case "phone": {
      if (!values.number?.trim()) return "";
      // Strip spaces/dashes but keep leading +
      const cleaned = values.number.replace(/[^\d+]/g, "");
      return `tel:${cleaned}`;
    }

    case "wifi": {
      if (!values.ssid?.trim()) return "";
      const enc = values.encryption || "WPA";
      const ssid = escapeWifi(values.ssid.trim());

      if (enc === "nopass") {
        return `WIFI:T:nopass;S:${ssid};;`;
      }

      const pass = escapeWifi(values.password || "");
      return `WIFI:T:${enc};S:${ssid};P:${pass};;`;
    }

    default:
      return "";
  }
}

/**
 * Returns true if a form field should be considered "filled".
 * Used to validate before showing a QR preview.
 */
export function hasRequiredFields(type, values = {}) {
  const schema = QR_TYPES[type];
  if (!schema) return false;

  return schema.fields
    .filter((f) => f.required)
    .every((f) => values[f.name]?.toString().trim());
}