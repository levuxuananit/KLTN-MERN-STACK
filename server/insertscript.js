const mongoose = require('mongoose');
const fs = require('fs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/phongtrodb');
function createModelIfNotExists(modelName, schema) {
    return mongoose.models[modelName] || mongoose.model(modelName, schema);
  }
// Define schemas
const AttributeSchema = new mongoose.Schema({
    id: String,
    price: String,
    acreage: String,
    published: String,
    hashtag: String
  });
  
  const CategorySchema = new mongoose.Schema({
    code: String,
    value: String,
    header: String,
    subheader: String
  });
  
  const ImageSchema = new mongoose.Schema({
    id: String,
    image: String
  });
  
  const LabelSchema = new mongoose.Schema({
    code: String,
    value: String
  });
  
  const OverviewSchema = new mongoose.Schema({
    id: String,
    code: String,
    area: String,
    type: String,
    target: String,
    bonus: String,
    created: String,
    expired: String
  });
  
  const PostSchema = new mongoose.Schema({
    id: String,
    title: String,
    star: String,
    labelCode: String,
    address: String,
    attributesId: String,
    categoryCode: String,
    description: String,
    userId: String,
    overviewId: String,
    imagesId: String
  });
  
  const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    password: String,
    phone: String,
    zalo: String
  });

// Create models
const Attribute = createModelIfNotExists('Attribute', AttributeSchema);
const Category = createModelIfNotExists('Category', CategorySchema);
const Image = createModelIfNotExists('Image', ImageSchema);
const Label = createModelIfNotExists('Label', LabelSchema);
const Overview = createModelIfNotExists('Overview', OverviewSchema);
const Post = createModelIfNotExists('Post', PostSchema);
const User = createModelIfNotExists('User', UserSchema);

// Function to insert data
async function insertData() {
    try {
      // Read SQL file
      const sqlFile = fs.readFileSync('phongtro123.sql', 'utf8');

      // Split the file into individual statements
      const statements = sqlFile.split(';').map(stmt => stmt.trim()).filter(stmt => stmt);
  
      for (const statement of statements) {
        if (statement.toLowerCase().startsWith('insert into')) {
          const tableName = statement.match(/INSERT INTO `?(\w+)`?/i)[1].toLowerCase();
          const valuesMatch = statement.match(/VALUES\s*($$[^)]+$$)/g);
          
          if (!valuesMatch) {
            console.log(`No values found for table ${tableName}`);
            continue;
          }
  
          const values = valuesMatch.map(v => 
            v.replace(/VALUES\s*/, '').replace(/^$$|$$$/g, '').split(',').map(item => 
              item.trim().replace(/^'|'$/g, '').replace(/\\'/g, "'")
            )
          );
  
          switch(tableName) {
            case 'attributes':
              await Attribute.insertMany(values.map(v => ({
                id: v[0], price: v[1], acreage: v[2], published: v[3], hashtag: v[4]
              })));
              break;
            case 'categorys':
              await Category.insertMany(values.map(v => ({
                code: v[1], value: v[2], header: v[3], subheader: v[4]
              })));
              break;
            case 'images':
              await Image.insertMany(values.map(v => ({
                id: v[0], image: v[1]
              })));
              break;
            case 'labels':
              await Label.insertMany(values.map(v => ({
                code: v[1], value: v[2]
              })));
              break;
            case 'overviews':
              await Overview.insertMany(values.map(v => ({
                id: v[0], code: v[1], area: v[2], type: v[3], target: v[4], bonus: v[5], 
                created: v[6], expired: v[7]
              })));
              break;
            case 'posts':
              await Post.insertMany(values.map(v => ({
                id: v[0], title: v[1], star: v[2], labelCode: v[3], address: v[4],
                attributesId: v[5], categoryCode: v[6], description: v[7], userId: v[8],
                overviewId: v[9], imagesId: v[10]
              })));
              break;
            case 'users':
              await User.insertMany(values.map(v => ({
                id: v[0], name: v[1], password: v[2], phone: v[3], zalo: v[4]
              })));
              break;
            default:
              console.log(`Unknown table: ${tableName}`);
          }
        }
      }
  
      console.log('Data inserted successfully');
    } catch (error) {
      console.error('Error inserting data:', error);
    } finally {
      mongoose.connection.close();
    }
  }
  
  insertData();