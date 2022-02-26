const destinations = [
    { value: 'sewing room', label: 'Szwalnia' },
    { value: 'shipment', label: 'Wysyłka' },
    { value: 'warehouse', label: 'Magazyn' },
    { value: 'lacks', label: 'Braki' }
]

const destinationsDict = {
    'sewing room': 'Szwalnia',
    'shipment': 'Wysyłka',
    'warehouse': 'Magazyn',
    'lacks': 'Braki'
}

const pillows = {
    'Gotowe': [
        { value: '40x40', label: '40x40' },
        { value: '40x60', label: '40x60' },
        { value: '50x50', label: '50x50' },
        { value: '45x45', label: '45x45' }
    ],
    'Materiał': [
        { value: '43x83', label: '43x83' },
        { value: '43x43', label: '43x43' },
        { value: '43x123', label: '43x123' },
        { value: '53x103', label: '53x103' },
        { value: '48x93', label: '48x93' },
    ]
}

export { destinations, destinationsDict, pillows }