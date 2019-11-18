const adminDB = require('../models')('yaguwagu_admin');
const partnerDB = require('../models')('yaguwagu_partner');


const orderSync = async () => {
  try {
    // Table 초기화
    await adminDB.PartnerOrderMenu.destroy({ truncate: true, cascade: true });
    await adminDB.PartnerOrder.destroy({
      where: { 
        id: { [adminDB.Sequelize.Op.gt]: 0 } 
      }
    });

    // Data 추가
    const fullOrder = await partnerDB.PartnerOrder.findAll();
    for(const order of fullOrder) {
      // PartnerOrder
      await adminDB.PartnerOrder.create({
        id: order.id,
        seat: order.seat,
      });
      // PartnerOrderMenu
      const fullPartnerOrderMenu = await partnerDB.PartnerOrderMenu.findAll({where: {partnerOrderId: order.id}});
      for(let partnerOrder of fullPartnerOrderMenu) {
        await adminDB.PartnerOrderMenu.create({
          partnerOrderId: order.id,
          name: partnerOrder.name,
          price: partnerOrder.price
        });
      }
    }
    // for(const partner of fullPartner) {
    //   // Parnter Main Image
    //   const fullPartnerMainImage = await adminDB.PartnerMainImage.findAll({
    //     where: {
    //       partnerId: partner.dataValues.id
    //     }
    //   });
    //   for(const mainImage of fullPartnerMainImage) {
    //     await clientDB.PartnerMainImage.create({
    //       partnerId: partner.dataValues.id,
    //       url: mainImage.url
    //     });
    //   }
    // }
  } catch (err) {
    console.error(err);
  }
}

module.exports = orderSync;