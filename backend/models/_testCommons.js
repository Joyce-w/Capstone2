const bcrypt = require("bcrypt");

const db = require("../db.js");
const { BCRYPT_WORK_FACTOR } = require("../config");

const testJobIds = [];

async function commonBeforeAll() {
  await db.query("DELETE FROM users");
  await db.query("DELETE FROM plants");
  await db.query("DELETE FROM user_lists");
  await db.query("DELETE FROM plant_list");

  await db.query(`
    INSERT INTO plants
        (id,plant_name,details,lighting,kid_friendly,pet_friendly,max_height,flowering,min_temp,max_temp,environment,placements,drought_tolerant,img,air_purifying)
        VALUES
        ('peperomia','Peperomia','With more than 1,000 known species, these hearty plants boast thick, fleshy leaveI. Its leaves can be textured or smooth in red, green, gray, or purple; variegated, marbled, or solid; large, heart-shaped, or tiny. All peperomia plants are slow-growing, can be planted all year long, and are low maintenance.',4,true,true,12,false,55,88,'both','FHT','medium','https://cdn.shopify.com/s/files/1/0278/6652/9932/products/WatermelonPeperomia_1024x1024@2x.jpg?v=1626960691',false),
        ('chinese_evergreen','Chinese Evergreen','They all have large, narrow, and glossy oval leaves on short stems, and flowers (on older plants) that bloom in spring or summer. Color varies from  dark green and silver to red. Evergreens are slow-growing and make excellent indoor foliage plants that can be potted and cared for year-round but cautious around pets as they can be toxic. Great indoor pollutant filter plant!',2,false,false,36,true,65,77,'both','FHT','medium','https://images.unsplash.com/photo-1623910994874-ec52179c9862?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',true),
        ('grape_ivy','Grape Ivy','Native to Central and South America, grape ivy is named as such not because it produces grapes, but because its leaves resemble grapevines. The vine grows slowly and can survive for many years.',4,true,true,84,false,65,80,'both','HTW','medium','https://www.thespruce.com/thmb/8ynPuUS2QdxWM_5TP9_wR7l6vy0=/2770x1847/filters:fill(auto,1)/grow-grape-ivy-vines-cissus-indoors-1902593-6-ef8592b6b2e6402485a1ae043b6ccb53.jpg',false),
        ('norfolk_island_pine','Norfolk Island Pine','Despite the name, it is not an actual pine tree. The can be kept as a foliage plant but in natural environments, reach up to hundres of feet tall! It has a very straight trunk and pleasingly symmetrical branches covered with short, inward-curving needles. In some regions, this slow-growing plant is growing as a Christmas tree!',5,true,true,60,false,60,75,'both','FTW','high','https://assets.weimgs.com/weimgs/rk/images/wcm/products/202120/0010/live-norfolk-island-pine-plant-in-10-grower-pot-c.jpg',false),
        ('dieffenbachia','Dieffenbachia','In outdoor conditions, these plants reach up to 10ft tall  but can limit to 3 to 5ft indoors. Dieffenbachia is a fast-growing plant that can achieve 2 feet in height within a year of planting a rooted cutting, provided it gets enough light',2,false,false,72,true,60,80,'both','FT','medium','https://www.miraclegro.com/sites/g/files/oydgjc111/files/styles/scotts_asset_image_720_440/public/asset_images/main_07137_RL_A-1888_718x404.jpg?itok=nVSRnO-j',false),
        ('snake_plant','Snake Plant','Easy Beginner plant with very distinct stiff, sword-like leaves.  These plants are easy to grow and, in many cases, nearly indestructible when it comes to care. They will thrive in very bright light or almost dark corners of the house. Great indoor pollutant filter plant!',6,true,true,48,false,60,85,'both','FTW','high','https://images.unsplash.com/photo-1599009944997-3544a939813c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',true),
        ('philodendron','Philodendron','These fast-growing plants have leaves that are typically large, green, and glossy. They come in both climbing and non-climbing varities. They are toxic to pets
        and humans if ingested.',6,true,false,72,false,60,80,'both','FTW','high','https://images.unsplash.com/photo-1609142621730-db3293839541?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',true)`);


  await db.query(`
    INSERT INTO users (username, email, pw)
    VALUES 
    ('test1','t1@gmail.com','123'),
    ('test2', 't2@gmail.com', '123');`);

  await db.query(`
    INSERT INTO user_lists (list_name, user_id)
    VALUES ('first_list', 1),
    ('second_list',
    2);` );

  await db.query(`
    INSERT INTO plant_list (user_list_id, plant_id)
        VALUES
        (1, 'peperomia'), 
        (2, 'hibiscus'), 
        (2, 'anthurium'), 
        (1, 'philodendron');` );
    
}




async function commonBeforeEach() {
  await db.query("BEGIN");
}

async function commonAfterEach() {
  await db.query("ROLLBACK");
}

async function commonAfterAll() {
  await db.end();
}


module.exports = {
  commonBeforeAll,
  commonBeforeEach,
  commonAfterEach,
  commonAfterAll,
  testJobIds,
};