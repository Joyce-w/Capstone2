CREATE TABLE houseplants(
   plant_id         VARCHAR(25) NOT NULL PRIMARY KEY
  ,plant_name       VARCHAR(25)
  ,description      VARCHAR(300)
  ,lighting         VARCHAR(7)
  ,kid_friendly     BOOLEAN 
  ,pet_friendly     BOOLEAN 
  ,max_height       INTEGER 
  ,flowering        BOOLEAN 
  ,ideal_temp       VARCHAR(5)
  ,environment      VARCHAR(8)
  ,trail_or_hang    BOOLEAN 
  ,drought_tolerant BOOLEAN 
  ,img              VARCHAR(100)
);
INSERT INTO houseplants(plant_id, plant_name,description,lighting,kid_friendly,pet_friendly,max_height,flowering,ideal_temp,environment,trail_or_hang,drought_tolerant,img) VALUES 
('peperomia','Peperomia',NULL,'medium, bright',true,true,12,false,'55-88','both',NULL,NULL,NULL),
('chinese_evergreen','Chinese Evergreen',NULL,'low, medium',false,false,36,false,'65-77','both',NULL,NULL,NULL),
('grape_ivy','Grape Ivy',NULL,'medium, bright',true,true,84,false,'65-80',NULL,true,NULL,NULL),
('norfolk_island_pine','Norfolk Island Pine','Easy beginner indoor tree','bright',true,true,NULL,false,'60-75','both',NULL,NULL,NULL),
('dieffenbachia','Dieffenbachia',NULL,'low, medium',false,false,72,false,'60-80','both',NULL,NULL,NULL),
('snake_plant','Snake Plant','Easy Beginner plant','low, medium, bright',true,true,48,false,'60-85','both',NULL,high,NULL),
('philodendron','Philodendron',NULL,'low, medium, bright',false,false,72,false,'60-80',NULL,true,high,NULL),
('english_ivy','English Ivy',NULL,'low, medium, bright',false,false,72,false,'55-70','both',true,NULL,NULL),
('zz_plant','ZZ Plant','Typo? No, they just last forever like they are taking a long slumber.. Zzzz...','low, medium, bright',false,false,36,false,'60-75',NULL,NULL,high,NULL),
('spider_plant','Spider Plant',NULL,'medium, bright',true,true,24,false,'60-75',NULL,NULL,high,NULL),
('rubber_tree','Rubber Tree',NULL,'medium, bright',true,true,84,false,'60-80',NULL,NULL,NULL,NULL),
('pothos','Pothos',NULL,'low, medium, bright',false,false,84,false,'60-80',NULL,NULL,high,NULL),
('cast_iron','Cast Iron Plant',NULL,'low',true,true,24,false,'45-85',NULL,NULL,NULL,NULL),
('ponytail_palm','Ponytail Palm','Actually a succulent rather than a palm!','bright',true,true,120,false,'55-75','both',NULL,NULL,NULL),
('calathea','Calathea',NULL,'low',true,true,24,false,'65-75',NULL,NULL,high,NULL),
('weeping_fig','Weeping Fig','Indirect but bright light. Ideal for corners next to windows!','bright',false,false,180,false,'60-75',NULL,NULL,medium,NULL),
('kalanchoe','Kalanchoe',NULL,'bright',false,false,24,true,'60-75',NULL,NULL,high,NULL),
('parlor_palm','Parlor palm',NULL,'medium, bright',true,true,72,false,'60-80',NULL,NULL,high,NULL),
('maidenhair_fern','Maidenhair Fern','The maidenhair is more fragile than most ferns. Avoid touching the fronds to prevent withering. Keep the soil constantly moist or place in a humid area. Maidenhairs can survive in low light but should be placed in medium to indirect bright light if you want more growth!','low, medium, bright',true,true,24,false,NULL,'both',false,low,NULL),
('birds_nest_fern','Bird''s Nest Fern','Maintain high humidity','low, medium, bright',NULL,true,NULL,false,'70-90','both',NULL,high,NULL),
('phalaenopsis_orchid','Phalaenopsis Orchid','Bright and indirect light for these to thrive!','bright',true,true,36,true,'50-80','both',NULL,high,NULL),
('hoya_heart','Hoya Kerrii',NULL,'low,medium, bright',true,true,72,true,'65-80',NULL,NULL,NULL,NULL),
('monstera','Monstera',NULL,'low, medium, bright',false,false,180,NULL,'65-85',NULL,NULL,high,NULL),
('anthurium','Anthurium',NULL,'bright',false,false,NULL,true,NULL,NULL,NULL,NULL,NULL),
('poinsettia','Poinsettia','Popular winter holiday plant.','medium, bright',NULL,NULL,NULL,true,NULL,NULL,NULL,NULL,NULL),
('hydrangeas','Hydrangeas',NULL,'medium',NULL,NULL,NULL,true,NULL,NULL,NULL,NULL,NULL),
('cyclamen','Cyclamen',NULL,'bright',NULL,NULL,NULL,true,NULL,NULL,NULL,NULL,NULL),
('amaryllis','Amaryllis','Popular winter holiday plant.','medium, bright',NULL,NULL,NULL,true,NULL,NULL,NULL,NULL,NULL),
('african_violet','African Violet',NULL,'low, medium',true,true,NULL,true,NULL,NULL,NULL,NULL,NULL),
('hibiscus','Hibiscus',NULL,'medium, high',NULL,NULL,NULL,true,NULL,NULL,NULL,NULL,NULL),
('peace_lily','Peace Lily',NULL,'bright',false,false,NULL,true,NULL,NULL,NULL,NULL,NULL),
('clivia','Clivia','If grown indoors, place these flowers near a bright spot. If they are outdoors, place them in indirect sun.','medium, bright',true,NULL,NULL,true,NULL,NULL,NULL,NULL,NULL),
('bromeliads','Bromeliads',NULL,'bright',true,true,NULL,true,NULL,NULL,NULL,NULL,NULL),
('chrysanthemums','Chrysanthemums',NULL,'bright',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL),
('christmas_cactus','Christmas Cactus','Succulent variety','medium, bright',true,true,NULL,NULL,NULL,'both',NULL,NULL,NULL),
('gloxinias','Gloxinias','bright','bright',NULL,NULL,NULL,NULL,NULL,'noth',NULL,NULL,NULL),
('sedum_donkey_tail','Sedum Donkey''s Tail','Succulent variety','medium, bright',true,true,NULL,NULL,NULL,'both',true,high,NULL),
('haworthia_zebra_plant','Haworthia Zebra plant','Succulent variety','medium, bright',true,true,NULL,NULL,NULL,'both',NULL,high,NULL),
('echeveria','Echeveria','Succulent variety','bright',true,true,NULL,NULL,NULL,'both',NULL,NULL,NULL),
('bunny_ear','Bunny Ear Cactus',NULL,'bright',false,false,36,NULL,NULL,NULL,NULL,NULL,NULL),
('string_of_pearls','String of Pearls',NULL,'medium, bright',false,false,24,NULL,NULL,'both',NULL,NULL,NULL),
('begonia_obliqua','Begonia Obliqua',NULL,'low, mid',true,true,24,true,'58-72','both',NULL,medium,NULL);
