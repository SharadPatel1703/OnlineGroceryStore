import logging

from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from sqlalchemy.testing.pickleable import User

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, allow_headers="*")  # Allow all origins and headers

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:1234@localhost/ecommerce'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class UserInfo(db.Model):
    name = db.Column(db.String(255))
    email = db.Column(db.String(255), primary_key=True)
    password = db.Column(db.String(255))
    address = db.Column(db.String(255))
    address2 = db.Column(db.String(255))
    city = db.Column(db.String(255))
    state = db.Column(db.String(255))
    zip = db.Column(db.String(255))

class ProductDetails(db.Model):
    product_id = db.Column(db.Integer, primary_key=True)
    product_name = db.Column(db.String(255))
    product_amount = db.Column(db.Integer)
    product_price = db.Column(db.Float)
    urli = db.Column(db.String(255))

class DeliveryInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    garlic = db.Column(db.Integer)
    onion = db.Column(db.Integer)
    potato = db.Column(db.Integer)
    orange = db.Column(db.Integer)
    pineapple = db.Column(db.Integer)
    apple = db.Column(db.Integer)
    email = db.Column(db.String(255))
    delivery_date = db.Column(db.Date)
    payment_amount = db.Column(db.Float)

@app.route('/save-user', methods=['POST', 'OPTIONS'])
def save_user():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', '*')
        return response

    try:
        data = request.get_json()
        # Ensure that the keys in the JSON payload match the model fields
        new_user = UserInfo(
            name=data.get('name'),
            email=data.get('email'),
            password=data.get('password'),
            address=data.get('address'),
            address2=data.get('address2'),
            city=data.get('city'),
            state=data.get('state'),
            zip=data.get('zip')
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "Data saved successfully"}), 200

    except Exception as e:
        logging.error(f"Error in confirm_payment: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500

@app.route('/get-products', methods=['GET'])
def get_products():
    try:
        with app.app_context():
            products = ProductDetails.query.all()

            product_list = []
            for product in products:
                product_data = {
                    'product_id': product.product_id,
                    'product_name': product.product_name,
                    'product_amount': product.product_amount,
                    'product_price': product.product_price,
                    'urli': product.urli
                }
                product_list.append(product_data)

            return jsonify({"product_list": product_list}), 200

    except Exception as e:
        return jsonify({"error": f"Error fetching products: {str(e)}"}), 500

@app.route('/check-password', methods=['POST', 'OPTIONS'])
def check_password():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', '*')
        return jsonify()

    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        user = UserInfo.query.filter_by(email=email).first()

        if user:
            base_pass = user.password
            if password == base_pass:
                return jsonify({"message": "Password is correct"}), 200
            else:
                return jsonify({"message": "Password is incorrect"}), 401
        else:
            return jsonify({"message": "User does not exist"}), 401

    except Exception as e:
        return jsonify({"error": f"Error checking password: {str(e)}"}), 500

@app.route('/confirm-payment', methods=['POST', 'OPTIONS'])
def confirm_payment():
    if request.method == 'OPTIONS':
        response = jsonify()
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', '*')
        response.headers.add('Access-Control-Allow-Methods', '*')
        return response

    try:
        data = request.get_json()

        # Assuming you have the user's email in the request data
        user_email = data.get('user_email')

        # Retrieve the user from UserInfo
        user = UserInfo.query.filter_by(email=user_email).first()

        if user:
            # Your existing logic for payment confirmation
            product_amounts = {
                'garlic': 0,
                'onion': 0,
                'potato': 0,
                'orange': 0,
                'pineapple': 0,
                'apple': 0,
            }

            for product_data in data.get('cartData',[]):
                product_name = product_data['product_name']
                amount = product_data.get('amount',0)

                if product_name.lower() in product_amounts:
                    product_amounts[product_name.lower()] += amount

            delivery_info = DeliveryInfo(
                garlic=product_amounts['garlic'],
                onion=product_amounts['onion'],
                potato=product_amounts['potato'],
                orange=product_amounts['orange'],
                pineapple=product_amounts['pineapple'],
                apple=product_amounts['apple'],
                email=user.email,
                delivery_date=datetime.now(),
                payment_amount=data.get('totalAmount'),
            )

            db.session.add(delivery_info)
            db.session.commit()

            return jsonify({"message": "Payment confirmed successfully"}), 200

        return jsonify({"error": "User not found"}), 404

    except Exception as e:
        logging.error(f"Error in confirm_payment: {e}", exc_info=True)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()
