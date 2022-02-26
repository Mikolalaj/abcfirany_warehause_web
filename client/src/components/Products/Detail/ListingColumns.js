
const MeterColumns = [
    {
        label: 'Szer. (cm)',
        size: 1,
        field: 'width'
    },
    {
        label: 'Ilość',
        size: 1,
        field: 'amount'
    },
    {
        label: 'Półka',
        size: 1,
        field: 'shelfCode'
    },
    {
        label: 'Cecha',
        size: 1,
        field: 'feature'
    },
    {
        label: 'Uwagi',
        size: 7,
        field: 'comments'
    },
    {
        label: '',
        size: 1
    }
]

const PillowColumns = [
    {
        label: 'Wymiar',
        size: 1,
        field: 'size'
    },
    {
        label: 'Wykończenie',
        size: 1,
        field: 'finish'
    },
    {
        label: 'Ilość',
        size: 1,
        field: 'amount',
        cast: amount => Math.floor(amount)
    },
    {
        label: 'Półka',
        size: 1,
        field: 'shelfCode'
    },
    {
        label: 'Cecha',
        size: 1,
        field: 'feature'
    },
    {
        label: 'Uwagi',
        size: 6,
        field: 'comments'
    },
    {
        label: '',
        size: 1
    }
]

const PremadeColumns = [
    {
        label: 'Wymiar',
        size: 1,
        field: 'size'
    },
    {
        label: 'Ilość',
        size: 1,
        field: 'amount',
        cast: amount => Math.floor(amount)
    },
    {
        label: 'Półka',
        size: 1,
        field: 'shelfCode'
    },
    {
        label: 'Cecha',
        size: 1,
        field: 'feature'
    },
    {
        label: 'Wykończenie',
        size: 1,
        field: 'feature'
    },
    {
        label: 'Uwagi',
        size: 6,
        field: 'comments'
    },
    {
        label: '',
        size: 1
    }
]

const TowelColumns = [
    {
        label: 'Wymiar',
        size: 1,
        field: 'size'
    },
    {
        label: 'Ilość',
        size: 1,
        field: 'amount',
        cast: amount => Math.floor(amount)
    },
    {
        label: 'Półka',
        size: 1,
        field: 'shelfCode'
    },
    {
        label: 'Cecha',
        size: 1,
        field: 'feature'
    },
    {
        label: 'Uwagi',
        size: 7,
        field: 'comments'
    },
    {
        label: '',
        size: 1
    }
]

export {
    MeterColumns,
    PillowColumns,
    PremadeColumns,
    TowelColumns
};