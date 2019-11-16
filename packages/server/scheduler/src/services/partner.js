const adminDB = require('../models')('yaguwagu_admin');
const clientDB = require('../models')('yaguwagu_client');

const partnerSync = async () => {
  try {
    // DB 삭제
    await clientDB.PartnerMainImage.destroy({ truncate: true, cascade: true });
    await clientDB.PartnerMenuImage.destroy({ truncate: true, cascade: true });
    await clientDB.PartnerMenu.destroy({ truncate: true, cascade: true });
    await clientDB.Partner.destroy({
      where: { 
        id: { [clientDB.Sequelize.Op.gt]: 0 } 
      }
    });

    // Partner
    const fullPartner = await adminDB.Partner.findAll();
    for(const partner of fullPartner) {
      await clientDB.Partner.create({
        id: partner.dataValues.id,
        name: partner.name,
        phone: partner.phone,
        time: partner.time  
      });
    }
    for(const partner of fullPartner) {
      // Parnter Main Image
      const fullPartnerMainImage = await adminDB.PartnerMainImage.findAll({
        where: {
          partnerId: partner.dataValues.id
        }
      });
      for(const mainImage of fullPartnerMainImage) {
        await clientDB.PartnerMainImage.create({
          partnerId: partner.dataValues.id,
          url: mainImage.url
        });
      }
      
      // Parnter Menu Image
      const fullPartnerMenuImage = await adminDB.PartnerMenuImage.findAll({
        where: {
          partnerId: partner.dataValues.id
        }
      });
      for(const menuIamge of fullPartnerMenuImage) {
        await clientDB.PartnerMenuImage.create({
          partnerId: partner.dataValues.id,
          url: menuIamge.url
        });
      }

      // Parnter Menu
      const fullPartnerMenu = await adminDB.PartnerMenu.findAll({
        where: {
          partnerId: partner.dataValues.id
        }
      });
      for(const menu of fullPartnerMenu) {
        await clientDB.PartnerMenu.create({
          partnerId: partner.dataValues.id,
          name: menu.name,
          price: menu.price
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
}

module.exports = partnerSync;