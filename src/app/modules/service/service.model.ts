import { model, Schema } from "mongoose";
import { IService, ServiceStatus } from "./service.interface";
import slugify from "slugify";

const ServiceSchema = new Schema<IService>(
  {
    business: {
      type: Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },
    name: { type: String, required: true, index: true },
    category: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    slug: {
      type: String,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    includedServices: {
      type: [String],
      default: [],
    },
    excludedServices: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    duration: {
      type: String,
    },
    status: {
      type: String,
      enum: Object.values(ServiceStatus),
      default: ServiceStatus.AVAILABLE,
    },
  },
  { timestamps: true, versionKey: false }
);

ServiceSchema.pre("save", async function (next) {
  if (this.isModified("name") || this.isModified("category")) {
    let slug = slugify(this.name, { lower: true, strict: true });
    const originalSlug = slug;

    let counter = 1;
    // Check uniqueness **within the same category**
    while (await Service.exists({ slug, category: this.category })) {
      slug = `${originalSlug}-${counter++}`;
    }

    this.slug = slug;
  }
  next();
});

export const Service = model<IService>("Service", ServiceSchema);
