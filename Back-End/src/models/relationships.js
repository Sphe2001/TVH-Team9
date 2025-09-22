import attachments from "./attachments.js";
import incident from "./incident.js";
import infrastructure from "./infrastructure.js";
import Municipality from "./municipality.js";
import sensors from "./sensorsModel.js";
import User from "./userModel.js";

incident.hasMany(infrastructure, { foreignKey: 'infra_id' });
infrastructure.belongsTo(incident, { foreignKey: 'infra_id' });

attachments.belongsTo(incident, { foreignKey: 'incident_id' });
incident.hasMany(attachments, { foreignKey: 'incident_id' });

infrastructure.hasOne(sensors, { foreignKey: 'sensor_id' });
sensors.belongsTo(infrastructure, { foreignKey: 'sensor_id' });

Municipality.belongsTo(User, { foreignKey: 'municipality_id' });
User.hasMany(Municipality, { foreignKey: 'municipality_id' });

export { attachments, incident, infrastructure, sensors };
