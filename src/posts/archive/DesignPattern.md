---
title: "Design Patterns 筆記"
date: "2024-05-14"
category: "筆記"
tags: 
    - Design Patterns
    - 設計模式
---


# Creational Patterns
## Factory Method
* Creational Patterns
* provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created
* 總而言之，就是提供一個可以父類別，讓使用者可以根據不同的需求去創造子類別，並實例化父類別的function，不一定每次調用都會創建新的實例
* ![](/img/DesignPatterns/Pasted_image_20240428164511.png)
#### Code
```cpp
#include<iostream>
using namespace std;


class Button {
public:
	virtual void render() = 0;
	virtual void onClick(void (*f)()) = 0;

};

class WindowsButton: public Button {
public:
	void render() override {
		cout << "render Windows Button" << endl;
	}

	void onClick(void (*f)()) override {
		cout << "Windows Button clicked" << endl;
	}
};

class HTMLButton: public Button {
public:
	void render() override {
		cout << "render HTML Button" << endl;
	}

	void onClick(void (*f)()) override {
		cout << "Web Button clicked" << endl;
	}
};



class Dialog {
public:
	virtual Button* createButton() = 0;

	void render() {
		Button* okButton = createButton();

		okButton->onClick(closeDialog);
		okButton->render();
	}

	static void closeDialog() {
		cout << "Close Dialog" << endl;
	}
};

class WindowsDialog: public Dialog {

public:
	Button* createButton() override {
		return new WindowsButton();
	}

};


class WebDialog: public Dialog {

public:
	Button* createButton() override {
		return new HTMLButton();
	}

};


class Application {
public:

	Dialog* dialog;
	void init(string config) {
		if(config == "Windows") {
			dialog = new WindowsDialog();
		} else if(config == "Web"){
			dialog = new WebDialog();
		} else {
			cout << "Unknown OS" << endl;
		}
	}

};


int main() {
	Application Client;
	Client.init("Web");
	Client.dialog->render();

}
```
## Abstract Factory Method
* Creational Patterns
* lets you produce families of related objects without specifying their concrete classes
* 總而言之，就是根據要求創建不同的工廠，而工廠生產的產品一樣，但是type不同，根據要求返回不同類型的多個產品
* ![](/img/DesignPatterns/Pasted_image_20240428164453.png)
#### Code
```cpp
#include<iostream>
using namespace std;



class Button {
public:
	virtual void paint() = 0;
};

class WinButton:public Button {
public:
	void paint() override {
		cout << "Windows Button painted" << endl;
	}
};

class MacButton:public Button {
public:
	void paint() override {
		cout << "macOS Button painted" << endl;
	}
};

class Checkbox {
public:
	virtual void paint() = 0;
};

class WinCheckbox:public Checkbox {
public:
	void paint() override {
		cout << "Windows Checkbox painted" << endl;
	}
};

class MacCheckbox:public Checkbox {
public:
	void paint() override {
		cout << "macOS Checkbox painted" << endl;
	}
};

class GUIFactory {
public:
	virtual Button* createButton() = 0;
	virtual Checkbox* createCheckbox() = 0;
};

class WinFactory: public GUIFactory{
public:
	Button* createButton() override {
		return new WinButton();
	}
	Checkbox* createCheckbox() override{
		return new WinCheckbox();
	}

};

class MacFactory: public GUIFactory{
public:
	Button* createButton() override {
		return new MacButton();
	}
	Checkbox* createCheckbox() override{
		return new MacCheckbox();
	}

};



class Application {
	GUIFactory* factory;
	Button* button;
	Checkbox* checkbox;
public:
	Application(GUIFactory* factory): factory(factory) {
		this->factory = factory;
	}
	void createUI() {
		button = factory->createButton();
		checkbox = factory->createCheckbox();
	}
	void paint() {
		button->paint();
		checkbox->paint();
	}
};

class ApplicationConfigurator {
public:
	void main(string config) {
		
		GUIFactory* factory;
		if(config == "Windows") {
			factory = new WinFactory();
		} else if(config == "Mac") {
			factory = new MacFactory();
		} else {
			cout << "Unknow OS" << endl;
		}

		Application app(factory);
		app.createUI();
		app.paint();
	}
};

int main() {
	ApplicationConfigurator Client;
	Client.main("Windows");
	Client.main("Mac");

}
```
## Builder Method
* Creational Patterns
* allows you to produce different types and representations of an object using the same construction code.
* 總而言之，就是讓初始化的建構子不要太繁瑣，將對象構造的程式碼從產品類中抽離，並放在一個名為Builder的獨立對象中，Builder不允許其他對象訪問正在建造中的產品。
* ![](/img/DesignPatterns/Pasted_image_20240427024720.png)
#### Code
```cpp
#include <iostream>
#include <string>
using namespace std;

class Car{
	int _seats;
	string _engine;
	bool _hasTripComputer;
	bool _hasGPS;

public:
	void setSeats(int seats) {
		_seats = seats;
        cout << "Setting seats to " << seats << endl;
	}
	void setEngine(string engine) {
		_engine = engine;
		cout << "Installing " << engine << " engine" << endl;
	}
	void setTripComputer(bool tmp) {
		_hasTripComputer = tmp;
		if (tmp) {
            cout << "Installing trip computer" << endl;
        }
	}
	void setGPS(bool tmp) {
		_hasGPS = tmp;
		if (tmp) {
            cout << "Installing GPS" << endl;
        }
	}
	void display() {
		cout << "Car with " << _seats << " seats, engine: " << _engine;
		cout << ", Trip computer: " << (_hasTripComputer ? "Yes" : "No");
		cout << ", GPS: " << (_hasGPS ? "Yes" : "No") << endl;
	}
};

class Manual{
	int _seats;
	string _engine;
	bool _hasTripComputer;
	bool _hasGPS;
public:
    void setSeats(int seats) {
		_seats = seats;
        cout << "Adding manual for seats: " << seats << endl;
    }

    void setEngine(const std::string engine) {
		_engine = engine;
        cout << "Adding manual for " << engine << " engine" << endl;
    }

    void setTripComputer(bool tmp) {
		_hasTripComputer = tmp;
        if (tmp) {
            cout << "Adding manual for trip computer" << endl;
        }
    }

    void setGPS(bool tmp) {
		_hasGPS = tmp;
        if (tmp) {
            cout << "Adding manual for GPS" << endl;
        }
    }
    void display() {
		cout << "Car with " << _seats << " seats, engine: " << _engine;
		cout << ", Trip computer: " << (_hasTripComputer ? "Yes" : "No");
		cout << ", GPS: " << (_hasGPS ? "Yes" : "No") << endl;
	}
};

class Builder {
public:
	virtual void reset() = 0;
	virtual void setSeats(int seats) = 0;
	virtual void setEngine(string engine) = 0;
	virtual void setTripComputer(bool tmp) = 0;
	virtual void setGPS(bool tmp) = 0;
};

class CarBuilder: public Builder {
	Car car;
public:
	CarBuilder() {
		reset();
	}
	void reset() override {
		car = Car();
	}
	void setSeats(int quantity) override {
		car.setSeats(quantity);
	}
	void setEngine(string engine) override {
		car.setEngine(engine);
	}
	void setTripComputer(bool tmp) override {
		car.setTripComputer(tmp);
	}
	void setGPS(bool tmp) override {
		car.setGPS(tmp);
	}

	Car getProduct() {
		return car;
	}
};

class CarManualBuilder: public Builder{
    Manual manual;
public:
    void reset() override {
        manual = Manual();
    }
    void setSeats(int seats) override {
        manual.setSeats(seats);
    }
    void setEngine(const string engineType) override {
        manual.setEngine(engineType);
    }
    void setTripComputer(bool included) override {
        manual.setTripComputer(included);
    }
    void setGPS(bool included) override {
        manual.setGPS(included);
    }
    Manual getProduct() {
        return manual;
    }
};

class Director {
public:
	void constrcuctSportsCar(Builder& builder) {
		builder.reset();
		builder.setSeats(2);
		builder.setEngine("SportEngine");
		builder.setTripComputer(true);
		builder.setGPS(true);
	}
	void constrcuctSUV(Builder& builder) {
		builder.reset();
		builder.setSeats(4);
		builder.setEngine("SUVEngine");
		builder.setTripComputer(true);
		builder.setGPS(true);
	}
};

class Application {
public:
	void makeCar() {
		Director director;

		CarBuilder builder;
		director.constrcuctSportsCar(builder);
		Car car = builder.getProduct();
		car.display();

		CarManualBuilder manualBuilder;
		director.constrcuctSportsCar(manualBuilder);
		Manual manual = manualBuilder.getProduct();
		manual.display();
	}
};

int main() {
	Application client;
	client.makeCar();
}
```

## Prototype Method
* Creational Patterns
* lets you copy existing objects without making your code dependent on their classes.

* 簡單來說，就是做一個通用接口(Prototype)，讓使用者可以用該接口clone不同類型的對象
* ![](/img/DesignPatterns/Pasted_image_20240509231212.png)

## Singleton Method
* Creational Patterns
* lets you ensure that a class has only one instance, while providing a global access point to this instance.
* 保證一個class只有一個instance，並提供一個訪問該instance的global access
* ![](/img/DesignPatterns/Pasted_image_20240509231238.png)

# Strcutional Patterns
## Adapter Method
* Structural Patterns
* allows objects with incompatible interfaces to collaborate.
* 適配器，轉換資料，讓資料可以換一種格式以供客戶使用其他接口
* ![](/img/DesignPatterns/Pasted_image_20240510004608.png)

## Bridge Method
* Structural Patterns
* lets you split a large class or a set of closely related classes into two separate hierarchies—abstraction and implementation—which can be developed independently of each other.
* 將繼承關係轉換為關聯關係，降低程式碼的複雜度，還有類與類之間的耦合；將抽象與實現解耦，使得兩者可以獨立變化
* 淺顯易懂的影片 https://youtu.be/3Wkp4AEaubI?si=8o4P7IHKFQ9r1QcT

## Composite Method
* 就是樹，應該吧

## Decorator Method
* 寫一個新的class，對原有的class新增功能；相較於對原有的class新增子類，這個方法不用被限制於原有類，繼承是靜態的，無法在執行時更改已有對象的行為，只能由不同子類創建的對象來替代當前的整個對象；且子類只能有一個父類。
* 所以 Decorator 比生成子類更加靈活。

## Facade Method 
* 提供用戶一個簡單明瞭的接口，不讓背後繁瑣的系統程序顯現在表面

## Flyweight Method 
* 將重複的狀態儲存起來，降低系統的浪費

## Proxy Method
* 就，代理，可以控制客戶請求，並處理過濾，減少對原系統負荷

# Behavioral Design Patterns
## Chain of Responsibility Method 
* 對請求處理，一個處理者沒處理完就給下一個，層層遞進，直到請求處理完成

## Command Method 
* 將使用者操作轉換成命令，而不是操作直接對應處理程序

## Iterator Method 
* 對collection創建一個迭代器，讓用戶可以獲取下一個元素、當前位置、重新開始迭代等；在不暴露底層結構的情況下遍歷元素。

## Mediator Method 
* 減少對象之間混亂的依賴關係，限制對象之間的直接交互，迫使對象們藉由一個中介者對象進行合作

## Memento Method
在不破壞對象封裝情況的前提下創建對象狀態快照，可通過讓負責人維護原發器狀態歷史紀錄來簡化原發器代碼

## Observer Method 
定義一種一對多依賴關係，使得每當一個對象狀態發生改變時，其相關依賴對象皆得到通知並被自動更新

## State Method 
將原始對象指向每種狀態的class，且將所以與狀態相關的工作委託給狀態class

## Strategy Method
將算法裝到一個名為策略的獨立class，並在需要策略算法時，通過接口將工作委派給策略的class去選擇並回傳演算法