import mongoose from 'mongoose';
interface ProductAttrs {
  image: string;
  price: number;
  availableSizes: string[];
  description: string;
  title: string;
}

interface ProductDoc extends mongoose.Document {
  image: string;
  price: number;
  availableSizes: string[];
  description: string;
  title: string;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const productSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    availableSizes: {
      type: [String],
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);
productSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>(
  'Product',
  productSchema
);
export { Product };
