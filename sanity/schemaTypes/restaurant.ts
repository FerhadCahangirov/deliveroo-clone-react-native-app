import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'restaurant',
    title: 'Restaurant',
    type: 'document',
    fields: [
        {
            name: "name",
            type: "string",
            title: "Resaurant name",
            validation: (Rule) => Rule.required()
        },
        {
            name: "short_description",
            type: "string",
            title: "Short description",
            validation: (Rule) => Rule.max(200),
        },
        {
            name: "image",
            type: "image",
            title: "Image of the restaurant"
        },
        {
            name: "Lat",
            type: "number",
            title: "Latitude of Restaurant"
        },
        {
            name: "long",
            type: "number",
            title: "Latitude of the Restaurant"
        },
        {
            name: "address",
            type: "string",
            title: "Restaurant address",
            validation: (Rule) => Rule.required()
        },
        {
            name: "rating",
            type: "number",
            title: "Enter a Rating from (1-5 Stars)",
            validation: (Rule) => Rule.required()
                .min(1)
                .max(5)
                .error("Please enter value between 1 and 5")
        },
        {
            name: "type",
            title: "Category",
            validation: (Rule) => Rule.required(),
            type: "reference",
            to: [{type: "category"}],
        },
        {
            name: "dishes",
            type: "array",
            title: "Dishes",
            of: [{type: "reference", to: [{type: "dish"}]}]
        }
    ],
})
