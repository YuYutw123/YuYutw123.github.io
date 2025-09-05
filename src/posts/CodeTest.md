---
title: Design Patterns 筆記
category: Notes
description: Design Patterns 的學習筆記。
draft: false
published: 2024-05-14
tags: ["Design Patterns"]
---

# Creational Patterns
## Factory Method
* Creational Patterns
* provides an interface for creating objects in a superclass, but allows subclasses to alter the type of objects that will be created
* 總而言之，就是提供一個可以父類別，讓使用者可以根據不同的需求去創造子類別，並實例化父類別的function，不一定每次調用都會創建新的實例
* ![](/img/DesignPatterns/Pasted_image_20240428164511.png)
#### Code
```cpp=
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