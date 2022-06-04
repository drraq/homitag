module.exports = (opts) => {

    const {ObjectId, _} = opts

    const index = ({sortBy, sortIn}) => {
        const options = {
            sort: {},
            projection: {
                description: 0,
                createdAt: 0
            }
        }

        const sortingField = sortBy ?? 'name'   // Sort by `name` by default
        const sortingOrder = sortIn ?? 1        // Sort ASC by default

        options['sort'][sortingField] = sortingOrder

        return {options}
    }
    const add = ({name, description}) => ({
        name,
        description,
        createdAt: Date.now()
    })

    const remove = ({id}) => {
        const query = {
            _id: ObjectId(id)
        }
        const options = {
            projection: {
                name: 1
            }
        }
        return {query, options}
    }

    const show = ({id}) => ({
        _id: ObjectId(id)
    })

    return {
        add,
        index,
        remove,
        show
    }
}