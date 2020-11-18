var express = require('express');
var bodyParser = require('body-parser');
var log4js = require('log4js');
var logger = log4js.getLogger();
logger.level = 'debug';
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const Category = new FileSync('./public/Category.json');
const PrototypeData = new FileSync('./public/PrototypeData.json');
const User = new FileSync('./public/User.json');
const UpdateDataRecord = new FileSync('./public/UpdateDataRecord.json');
const Category_db = low(Category);
const PrototypeData_db = low(PrototypeData);
const User_db = low(User);
const UpdateDataRecord_db = low(UpdateDataRecord);
var app = express();
app.use(express.json());
var cookieParser = require('cookie-parser');
const { data } = require('jquery');
app.use(cookieParser('secret'));
app.use(express.static(__dirname + '/prototypeFile'));
app.all('*', function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-With');
	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
	next();
});

var upload_zip = require(__dirname + '/upload-express-formidable.js');
app.use('/upload', upload_zip);
app.post('/add_category', function (req, res) {
	try {
		var is_exists = Category_db.get('category')
			.filter({ category_id: req.body.category_id })
			.value()
		console.log(`is_exists:${req.body.category_id}`, is_exists);
		if (is_exists.length == 0) {
			Category_db.get('category')
				.push({
					category_id: req.body.category_id,
					category_name: req.body.category_name,
					category_create_time: req.body.category_create_time,
					category_is_delete: req.body.category_is_delete
				})
				.write();
			res.send({ code: 200, msg: '添加成功' });
			logger.info({ code: 200, msg: '添加成功' });
		} else {
			res.send({ code: 202, msg: `ID:${req.body.category_id}已存在` });
			logger.info({ code: 202, msg: `ID:${req.body.category_id}已存在` });
		}
	} catch (err) {
		res.send({ code: 204, msg: `添加失败:${err}` });
		logger.error({ code: 204, msg: `添加失败:${err}` });
	}

});
app.get('/select_category', function (req, res) {
	try {
		var obj = Category_db.get('category');
		res.send({ code: 200, msg: obj });
		logger.info({ code: 200, msg: obj });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});

app.post('/search_category_data_condition', function (req, res) {
	var obj;
	try {
		obj = Category_db.get('category').find({ category_name: req.body.category_name });
		logger.info({ code: 200, msg: [obj] });
		res.send({ code: 200, msg: [obj] });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});

app.put('/update_category', function (req, res) {
	try {
		Category_db.get('category')
			.find({ category_id: req.body.category_id })
			.assign({
				category_id: req.body.category_id,
				category_name: req.body.category_name,
				category_create_time: req.body.category_create_time,
				category_is_delete: req.body.category_is_delete
			})
			.write();
		res.send({ code: 200, msg: '更改成功' });
		logger.info({ code: 200, msg: '更改成功' });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});

app.delete('/delete_category', function (req, res) {
	try {
		Category_db.get('category')
			.find({ category_id: req.body.category_id })
			.assign({ category_id: req.body.category_id, category_is_delete: true })
			.write();
		res.send({ code: 200, msg: '删除成功' });
		logger.info({ code: 200, msg: '删除成功' });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});

app.post('/add_prototype_data', function (req, res) {
	try {
		var is_exists = PrototypeData_db.get('prototype_data')
			.filter({ prototype_data_id: req.body.prototype_data_id })
			.value()
		if (is_exists.length == 0) {
			PrototypeData_db.get('prototype_data')
				.push({
					prototype_data_id: req.body.prototype_data_id,
					prototype_data_name: req.body.prototype_data_name,
					prototype_data: req.body.prototype_data,
					prototype_data_category: req.body.prototype_data_category,
					prototype_data_remark: req.body.prototype_data_remark,
					prototype_data_create_time: req.body.prototype_data_create_time,
					prototype_data_is_delete: false
				})
				.write();
			res.send({ code: 200, msg: '添加成功' });
			logger.info({ code: 200, msg: '添加成功' });
		} else {
			res.send({ code: 202, msg: `ID:${req.body.prototype_data_id}已存在` });
			logger.info({ code: 202, msg: `ID:${req.body.prototype_data_id}已存在` });
		}
	} catch (err) {
		res.send({ code: 204, msg: `添加失败:${err}` });
		logger.error({ code: 204, msg: `添加失败:${err}` });
	}

});

app.get('/select_prototype_data', function (req, res) {
	try {
		var obj = PrototypeData_db.get('prototype_data');
		res.send({ code: 200, msg: obj });
		logger.info({ code: 200, msg: obj });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});

app.post('/search_prototype_data_condition', function (req, res) {
	var obj;
	try {
		obj = PrototypeData_db.get('prototype_data').find({ prototype_data_name: req.body.prototype_data_name });
		logger.info({ code: 200, msg: [obj] });
		res.send({ code: 200, msg: [obj] });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});


app.put('/update_prototype_data', function (req, res) {
	try {
		PrototypeData_db.get('prototype_data')
			.find({ prototype_data_id: req.body.prototype_data_id })
			.assign({
				prototype_data_id: req.body.prototype_data_id,
				prototype_data: req.body.prototype_data,
				prototype_data_name: req.body.prototype_data_name,
				prototype_data_category: req.body.prototype_data_category,
				prototype_data_remark: req.body.prototype_data_remark,
				prototype_data_create_time: req.body.prototype_data_create_time,
				prototype_data_is_delete: false
			})
			.write();

		function getFormatDate() {
			var date = new Date();
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentDate1 = date.getFullYear() + "-" + month + "-" + strDate
				+ "-" + date.getHours() + "-" + date.getMinutes() + "-" + date.getSeconds();
			var currentDate2 = `${date.getFullYear()}${month}${strDate}${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
			return [currentDate1, currentDate2];
		}
		var t1 = getFormatDate()[0];
		var t2 = getFormatDate()[1];
		UpdateDataRecord_db.get('UpdateDataRecord')
			.push({
				id: t2,
				prototype_data_id: req.body.prototype_data_id,
				prototype_data_name: req.body.prototype_data_name,
				prototype_data: req.body.prototype_data,
				prototype_data_category: req.body.prototype_data_category,
				prototype_data_remark: req.body.prototype_data_remark,
				prototype_data_create_time: req.body.prototype_data_create_time,
				prototype_data_update_time: t1
			})
			.write();
		res.send({ code: 200, msg: '更改成功' });
		logger.info({ code: 200, msg: '更改成功' });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});

app.delete('/delete_prototype_data', function (req, res) {
	try {
		PrototypeData_db.get('prototype_data')
			.find({ prototype_data_id: req.body.prototype_data_id })
			.assign({ prototype_data_id: req.body.prototype_data_id, prototype_data_is_delete: true })
			.write();
		res.send({ code: 200, msg: '删除成功' });
		logger.info({ code: 204, msg: '删除成功' });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});


app.post('/add_user', function (req, res) {
	try {
		var is_exists = User_db.get('user')
			.filter({ user_id: req.body.user_id })
			.value()
		if (is_exists.length == 0) {
			User_db.get('user')
				.push({
					user_id: req.body.user_id,
					user_name: req.body.user_name,
					password: req.body.password,
					function_permission: req.body.function_permission,
					user_create_time: req.body.user_create_time,
					user_is_delete: req.body.user_is_delete
				})
				.write();
			res.send({ code: 200, msg: '添加成功' });
			logger.info({ code: 200, msg: '添加成功' });
		} else {
			res.send({ code: 202, msg: `ID:${req.body.user_id}已存在` });
			logger.info({ code: 202, msg: `ID:${req.body.user_id}已存在` });
		}
	} catch (err) {
		res.send({ code: 204, msg: `添加失败:${err}` });
		logger.error({ code: 204, msg: `添加失败:${err}` });
	}
});


app.get('/select_user', function (req, res) {
	try {
		var obj = User_db.get('user');
		res.send({ code: 200, msg: obj });
		logger.info({ code: 200, msg: obj });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});

app.post('/search_user_condition', function (req, res) {
	var obj;
	try {
		obj = User_db.get('user').find({ user_name: req.body.user_name });
		logger.info({ code: 200, msg: [obj] });
		res.send({ code: 200, msg: [obj] });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});


app.put('/update_user', function (req, res) {
	try {
		User_db.get('user')
			.find({ user_id: req.body.user_id })
			.assign({
				user_id: req.body.user_id,
				user_name: req.body.user_name,
				password: req.body.password,
				function_permission: req.body.function_permission,
				user_create_time: req.body.user_create_time,
				user_is_delete: req.body.user_is_delete
			})
			.write();
		res.send({ code: 200, msg: '更改成功' });
		logger.info({ code: 200, msg: '更改成功' });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});

app.delete('/delete_user', function (req, res) {
	try {
		User_db.get('user')
			.find({ user_id: req.body.user_id })
			.assign({ user_is_delete: true })
			.write();
		res.send({ code: 200, msg: '删除成功' });
		logger.info({ code: 200, msg: '删除成功' });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});

app.post('/login', function (req, res) {
	var obj;
	try {
		obj = User_db.get('user').find({ user_name: req.body.user_name });
		logger.info({ code: 200, msg: [obj] });
		if (req.body.password === JSON.stringify(obj.get('password')).split('"')[1]) {
			res.send({ code: 200, msg: '登录成功', permission: obj.get('function_permission') });
		} else {
			res.send({ code: 201, msg: '密码错误' });
		}
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});


app.post('/id_get_update_data_record', function (req, res) {
	try {
		var data = UpdateDataRecord_db.get('UpdateDataRecord')
			.filter({ prototype_data_id: req.body.prototype_data_id })
			.value()
		res.send({ code: 200, msg: data });
		logger.info({ code: 200, msg: data });
	} catch (err) {
		res.send({ code: 204, msg: err });
		logger.error({ code: 204, msg: err });
	}
});

app.post('/add_update_data_record', function (req, res) {
	try {
		var is_exists = UpdateDataRecord_db.get('UpdateDataRecord')
			.filter({ prototype_data_id: req.body.prototype_data_id })
			.value()
		if (is_exists.length == 0) {
			UpdateDataRecord_db.get('UpdateDataRecord')
				.push({
					prototype_data_id: req.body.prototype_data_id,
					prototype_data_name: req.body.prototype_data_name,
					prototype_data: req.body.prototype_data,
					prototype_data_category: req.body.prototype_data_category,
					prototype_data_remark: req.body.prototype_data_remark,
					prototype_data_create_time: req.body.prototype_data_create_time,
					prototype_data_is_delete: false
				})
				.write();
			res.send({ code: 200, msg: '添加成功' });
			logger.info({ code: 200, msg: '添加成功' });
		} else {
			res.send({ code: 202, msg: `ID：${req.body.prototype_data_id}，已存在` });
			logger.info({ code: 202, msg: `ID：${req.body.prototype_data_id}，已存在` });
		}
	} catch (err) {
		res.send({ code: 204, msg: `添加失败:${err}` });
		logger.error({ code: 204, msg: `添加失败:${err}` });
	}
});

var server = app.listen(8006, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('应用实例，访问地址为 http://%s:%s', host, port);
});
