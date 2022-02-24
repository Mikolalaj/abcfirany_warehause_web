var pool = require('../../db');

async function connectFeatures(features, productId) {
    // connect existing features to product

    if (features.length > 0) {
        try {
            const res = await pool.query(`
            INSERT INTO products_features
                (product_id, feature_id)
            VALUES
                ${features.map(feature => `('${productId}', '${feature}')`).join(',')}`);
            if (res.rowCount === 0) {
                return res
                    .status(500)
                    .json({ message: 'Nie udało się dodać istniejących cech.' });
            }
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ message: 'Nie udało się dodać istniejących cech.' });
        }
    }
}

async function addFeatures(features, productId) {
    // add new features to product

    if (features.length > 0) {
        try {
            const res = await pool.query(`
                INSERT INTO features
                (feature_id, name)
            VALUES
                ${features.map(feature => `('${feature.value}', '${feature.label}')`).join(',')}`);
            if (res.rowCount === 0) {
                return res
                    .status(500)
                    .json({ message: 'Nie udało się dodać nowej cechy.' });
            }
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ message: 'Nie udało się dodać nowej cechy.' });
        }

        try {
            const res = await pool.query(`
            INSERT INTO products_features
                (product_id, feature_id)
            VALUES
                ${features.map(feature => `('${productId}', '${feature.value}')`).join(',')}`);
            if (res.rowCount === 0) {
                return res
                    .status(500)
                    .json({ message: 'Nie udało się połączyć cechy z produktem.' });
            }
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ message: 'Nie udało się połączyć cechy z produktem.' });
        }
    }
}

async function disconnectFeatures(features, productId) {
    if (features.length > 0) {
        try {
            const res = await pool.query(`
            DELETE FROM
                products_features
            WHERE
                product_id = '${productId}' AND
                feature_id IN
                    (
                        SELECT feature_id FROM features WHERE name IN (${features.map(feature => `'${feature}'`).join(',')})
                    )
            `);
            if (res.rowCount === 0) {
                return res
                    .status(500)
                    .json({ message: 'Nie udało się usunąć istniejących cech.' });
            }
        } catch (error) {
            console.log(error);
            return res
                .status(400)
                .json({ message: 'Nie udało się usunąć istniejących cech.' });
        }
    }
}

module.exports = {
    connectFeatures,
    addFeatures,
    disconnectFeatures
}