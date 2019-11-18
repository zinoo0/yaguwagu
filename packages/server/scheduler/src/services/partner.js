const adminDB = require('../models')('yaguwagu_admin');
const clientDB = require('../models')('yaguwagu_client');

const partnerSync = async () => {
  try {
    // Table 초기화
    await clientDB.PartnerMainImage.destroy({ truncate: true, cascade: true });
    await clientDB.PartnerMenuImage.destroy({ truncate: true, cascade: true });
    await clientDB.PartnerMenu.destroy({ truncate: true, cascade: true });
    await clientDB.Partner.destroy({
      where: { 
        id: { [clientDB.Sequelize.Op.gt]: 0 } 
      }
    });

    const fullPartner = await adminDB.Partner.findAll();

    for(const partner of fullPartner) {
      // Partner
      await clientDB.Partner.create({
        id: partner.id,
        name: partner.name,
        phone: partner.phone,
        time: partner.time  
      });

      // Parnter Main Image
      const fullPartnerMainImage = await adminDB.PartnerMainImage.findAll({where: {partnerId: partner.id}});
      for(const mainImage of fullPartnerMainImage) {
        await clientDB.PartnerMainImage.create({
          partnerId: partner.id,
          url: mainImage.url
        });
      }
      
      // Parnter Menu Image
      const fullPartnerMenuImage = await adminDB.PartnerMenuImage.findAll({where: {partnerId: partner.id}});
      for(const menuIamge of fullPartnerMenuImage) {
        await clientDB.PartnerMenuImage.create({
          partnerId: partner.id,
          url: menuIamge.url
        });
      }

      // Parnter Menu
      const fullPartnerMenu = await adminDB.PartnerMenu.findAll({where: {partnerId: partner.id}});
      for(const menu of fullPartnerMenu) {
        await clientDB.PartnerMenu.create({
          partnerId: partner.id,
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